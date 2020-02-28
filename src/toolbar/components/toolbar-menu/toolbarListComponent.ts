/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarListController
 */
export class ToolbarListController {
  public toolbarList: any;
  public isEmpty: boolean = false;
  public dropdownClass: any[];

  /**
   * Method for handling clicking on toolbar list's item.
   * @memberof ToolbarListController
   * @function onItemClick
   * @param {Object} {item: Object} object with item property set to which item was clicked.
   */
  public onItemClick: (args: {item: any, $event: any}) => void;

  /**
   * Angular's function to observe on changes.
   * @memberof ToolbarListController
   * @function isToolbarEmpty
   * @param changesObj changed object.
   */
  public $onChanges(changesObj: any) {
    if (changesObj.toolbarList) {
      this.isEmpty = this.isToolbarEmpty();
    }
  }

  /**
   * Method which filters out
   * @memberof ToolbarListController
   * @function isToolbarEmpty
   * @returns {boolean}
   */
  private isToolbarEmpty(): boolean {
    return this.toolbarList &&
      this.toolbarList.items &&
      this.toolbarList.items.some((item: any) => !item.hidden);
  }

  private isToolbarEnabled(): boolean {
    return this.toolbarList &&
      this.toolbarList.enabled &&
      this.toolbarList.items &&
      this.toolbarList.items.some((item: any) => item.enabled);
  }

  private toolbarTitle(): string {
    let squashedTitle = [this.toolbarList.title];

    // If the toolbar item has child elements and all of them are disabled
    if (this.toolbarList &&
        this.toolbarList.items &&
        this.toolbarList.items.every((item: any) => !item.enabled)) {
      // Collect the titles (reasons why they are disabled) of all the disabled children
      let items = this.toolbarList.items.filter((item : any) => item.title !== undefined);
      squashedTitle.push(...items.map((item: any) => `⚬ ${item.text} - ${item.title}`));
    }

    return squashedTitle.join('\n');
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarList
 * @description
 *    Component which will generate list in toolbar with toolbarItems as dropdown menu.
 *
 * @attr {Expression} onItemClick
 *    Method which will be executed when clicked on view. See
 *    {@link miqStaticAssets.ToolbarListController#onItemClick} which arguments are
 *    needed.
 * @attr {Array} toolbarItems
 *    List of all items which are used in toolbar
 * @example
 * <miq-toolbar-list toolbar-list="ctrl.toolbarItems"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-list>
 */
export default class ToolbarList {
  public replace: boolean = true;
  public template = require('./toolbar-list.html');
  public controller: any = ToolbarListController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    toolbarList: '<',
    onItemClick: '&',
    dropdownClass: '<?'
  };
}
