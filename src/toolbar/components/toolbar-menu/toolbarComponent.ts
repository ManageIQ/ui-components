import {IToolbarItem} from '../../interfaces/toolbar';
import {ToolbarType} from '../../interfaces/toolbarType';
import * as _ from 'lodash';

const CUSTOM_ID = 'custom_';

/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarController
 * @param $window {ng.IWindowService} window service for redirecting to non angular pages.
 * @param $location {ng.ILocationService} location service to handle redirect to different angular pages.
 * @param $timeout {ng.ITimeoutService} timeout service.
 * @param $element {ng.IRootElementService} access to the element.
 * @param $sce {ng.ISCEService} service for enabling html strings to be html objects injected to page as html and not as
 * string.
 */
export class ToolbarController {
  public toolbarItems: any;
  public toolbarViews: any;
  public onViewClick: (args: {item: any, $event: any}) => void;
  /*@ngInject*/
  constructor(private $window: ng.IWindowService,
              private $location: ng.ILocationService,
              private $timeout: ng.ITimeoutService,
              private $element: ng.IRootElementService,
              private $sce: ng.ISCEService) {
  }

  /**
   * Method for finding custom toolbar item's per each toolbar group.
   * @memberof ToolbarController
   * @function toolbarHasCustom
   * @param toolbarItem toolbar group item.
   * @returns {any[]} array of custom items in toolbar.
   */
  public toolbarHasCustom(toolbarItem): any {
    return _.find(toolbarItem, {name: 'custom'});
  }

  /**
   * Handle clicking on item in toolbar.
   * Check what function has item for handling click action it's one of [actionUrl, redirectUrl, actionFunction,
   * eventFunction].
   *    * actionUrl      - will perform location path change.
   *    * redirectUrl    - will perform window redirect.
   *    * actionFunction - will perform call without any arguments.
   *    * eventFunction  - will perform call to this function with $event specified.
   * @memberof ToolbarController
   * @function onItemClick
   * @param {Object} item what was clicked in toolbar (member of toolbar items).
   * @param {Object} $event for passing it to eventFunction of item (good for checking target).
   */
  public onItemClick(item: any, $event: any) {
    if (item.hasOwnProperty('actionUrl')) {
      this.$location.path(item.actionUrl);
    } else if (item.hasOwnProperty('redirectUrl')) {
      this.$window.location.replace(item.redirectUrl);
    } else if (item.hasOwnProperty('actionFunction')) {
      item.actionFunction();
    } else if (item.hasOwnProperty('eventFunction')) {
      item.eventFunction($event);
    }
  }

  /**
   * Filter out items which does not have buttons, select or custom html in them and check if array is not empty. If
   * this array would be empty there is no content which could be shown in toolbar group.
   *    * see {@link miqStaticAssets.ToolbarController#isButtonOrSelect} on how it is checked button or select item.
   *    * see {@link miqStaticAssets.ToolbarController#isCustom} on how it is checked custom html item.
   * @memberof ToolbarController
   * @function hasContent
   * @param {Array<IToolbarItem>} toolbarItem array of items which are checked for content.
   * @returns {boolean} true|false isEmpty or not.
   */
  public hasContent(toolbarItem: Array<IToolbarItem>): boolean {
    return toolbarItem && toolbarItem.filter((item) => {
        return item && (ToolbarController.isButtonOrSelect(item) || ToolbarController.isCustom(item));
      }).length !== 0;
  }

  /**
   * Escape html custom data and make them available for html insertion to toolbar.
   * @memberof ToolbarController
   * @function hasContent
   * @param escapedString html string without escaped items.
   * @returns {any} html object, this object can be bound to see
   * {@link https://docs.angularjs.org/api/ng/directive/ngBindHtml}
   */
  public trustAsHtml(escapedString: string): any {
    escapedString = ToolbarController.htmlDecode(escapedString);
    return this.$sce.trustAsHtml(escapedString);
  }

  /**
   * Helper method for getting string value of {@link ToolbarType.BUTTON_SELECT}
   * @memberof ToolbarController
   * @function getToolbarListType
   * @returns {string}
   */
  public getToolbarListType(): string {
    return ToolbarType.BUTTON_SELECT;
  }

  /**
   * Helper method for getting string value of {@link ToolbarType.BUTTON}
   * @memberof ToolbarController
   * @function getToolbarListType
   * @returns {string}
   */
  public getButtonType(): string {
    return ToolbarType.BUTTON;
  }

  public getToolbarKebabType(): string {
    return ToolbarType.KEBAB;
  }

  /**
   * Helper method for getting string value of {@link ToolbarType.CUSTOM}
   * @memberof ToolbarController
   * @function getToolbarListType
   * @returns {string}
   */
  public getCustomType(): string {
    return ToolbarType.CUSTOM;
  }

  public getButtonTwoState() {
    return ToolbarType.BUTTON_TWO_STATE;
  }

  public collapseButton() {
    if (! this.toolbarItems) {
      return;
    }

    const isCustomButton = (item) => item && item.id && item.id.includes(CUSTOM_ID);
    const hasCustomButtons = (itemGroup) => _.some(itemGroup, isCustomButton);

    let buttonsIndex = _.findLastIndex(this.toolbarItems, hasCustomButtons);
    if (buttonsIndex === -1) {
      return;
    }

    let kebabIndex = buttonsIndex + 1;
    // Check if the kebab already exists or create it
    if (this.toolbarItems.length < kebabIndex ||
        !this.toolbarItems[kebabIndex][0] ||
        this.toolbarItems[kebabIndex][0].type !== ToolbarType.KEBAB) {
      this.toolbarItems.splice(kebabIndex, 0, [{type: ToolbarType.KEBAB, items: []}]);
    }

    // Move the last element from the custom buttons to the kebab
    let item = this.toolbarItems[buttonsIndex].pop();
    if (item) { // if the array was empty, pop returns undefined that we don't want to push
      this.toolbarItems[kebabIndex][0].items.push(item);
    }
  }

  private $onChanges(changesObj) {
    if (changesObj.toolbarItems) {
      this.$timeout(function() {
        // If the toolbar has 2 lines of buttons, start moving custom buttons to a kebab
        if (this.toolbarTooHigh()) {
          this.collapseButton();
        }
      }.bind(this));

    }
  }

  /**
   * Private static function to determine if the toolbar is too high
   * @memberof ToolbarController
   * @function toolbarTooHigh
   * @returns {boolean}
   */
  private toolbarTooHigh() {
    let container = this.$element.children()[0];
    let firstButton = container.querySelector('.miq-toolbar-group');

    return container.clientHeight > firstButton.clientHeight * 2;
  }

  /**
   * Private static function for decoding html.
   * @memberof ToolbarController
   * @function htmlDecode
   * @param input html string containing custom html.
   * @returns {string} unescaped html string.
   */
  public static htmlDecode(input: string): string {
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }

  /**
   * Private static function for checking if toolbar item has name and if this name is `"custom"`.
   * @memberof ToolbarController
   * @function hasContent
   * @param {IToolbarItem} item which is checked for name property.
   * @returns {boolean} true|false if it's item with custom html.
   */
  private static isCustom(item: IToolbarItem): boolean {
    return item.name && item.name === ToolbarType.CUSTOM;
  }

  /**
   * Private static function for checking if toolbar item type and if this type is button or select.
   *    * see {@link miqStaticAssets.ToolbarController#isButtonSelect} on how it's checked for select type.
   *    * see {@link miqStaticAssets.ToolbarController#isButton} on how it's checked for button type.
   * @memberof ToolbarController
   * @function isButtonOrSelect
   * @param {IToolbarItem} item which is checked for type property.
   * @returns {boolean} true|false if it's item with button or button select type.
   */
  private static isButtonOrSelect(item: IToolbarItem): boolean {
    return item.type && (
        (ToolbarController.isButtonSelect(item) && item.items && item.items.length !== 0)
        || ToolbarController.isButton(item)
        || ToolbarController.isButtonTwoState(item)
        || ToolbarController.isKebabMenu(item)
      );
  }

  private static isButtonTwoState(item: IToolbarItem): boolean {
    return item.type === ToolbarType.BUTTON_TWO_STATE;
  }

  /**
   * Private static function for checking if toolbar item type is buttonSelect.
   * @memberof ToolbarController
   * @function isButtonSelect
   * @param {IToolbarItem} item item which is checked for type property.
   * @returns {boolean} true|false if it's item with type equals to `"buttonSelect"`.
   */
  private static isButtonSelect(item: IToolbarItem): boolean {
    return item.type === ToolbarType.BUTTON_SELECT;
  }

  private static isKebabMenu(item: IToolbarItem): boolean {
    return item.type === ToolbarType.KEBAB;
  }

  /**
   * Private static function for checking if toolbar item type is button.
   * @memberof ToolbarController
   * @function isButton
   * @param {IToolbarItem} item item which is checked for type property.
   * @returns {boolean} true|false if it's item with type equals to `"button"`.
   */
  private static isButton(item): boolean {
    return item.type === ToolbarType.BUTTON;
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarMenu
 * @description
 *    This component is for whole toolbar implementation. It's advantages are, that it takes custom components as well
 *    so they can be used instead of just plain JS objects (pass html inside toolbarItems attribute).
 *    See {@link miqStaticAssets.ToolbarController} for implementation of all methods and behavior of this component.
 *    Attribute toolbarItems for custom html needs to have set `args.html`:
 *    ```JSON
 *    [[
 *      {"name" : "custom",
 *      "args" : {
 *        ...
 *        "html" : "<div>html string, this string will be generated as part of form group</div>"
 *        ...
 *      }}
 *    ]]
 *    ```
 *    How each button is treated see {@link miqStaticAssets.ToolbarController#hasContent} and observe each static
 *    function which
 *    is responsible for deciding what type of button will be used.
 *
 * @attr {Expression} onViewClick
 *    Method which will be executed when clicked on view. See {@link miqStaticAssets.ToolbarController#onViewClick}
 *    which arguments are
 *    needed.
 * @attr {Array} toolbarViews
 *    List of all views which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<IToolbarItem>` See {@link IToolbarItem} for entities of toolbarViews.
 * @attr {Array} toolbarItems
 *    List of all items which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<Array<IToolbarItem>>` See {@link IToolbarItem} for entities of toolbarItems.
 * @example
 * <miq-toolbar-menu toolbar-views="ctrl.toolbarViews"
 *                   toolbar-items="ctrl.toolbarItems"
 *                   on-view-click="ctrl.onClick(item)">
 * </miq-toolbar-menu>
 */
export default class Toolbar {
  public replace: boolean = true;
  public template = require('./toolbar-menu.html');
  public controller: any = ToolbarController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    toolbarViews: '<',
    toolbarItems: '<',
    onViewClick: '&'
  };
}
