import {IToolbarItem} from '../../interfaces/toolbar';
/**
 * Asf
 *
 * @interface
 */
export interface IToolbarListBindings {
  toolbarList: any;
  onItemClick: (args: {item: any}) => void;
}

/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarListController
 * @implements {IToolbarListBindings}
 */
export class ToolbarListController implements IToolbarListBindings {
  public toolbarList: IToolbarItem;
  public isEmpty: boolean = false;

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
    console.log(this.toolbarList.items);
    return this.toolbarList &&
      this.toolbarList.items &&
      this.toolbarList.items.filter((item: IToolbarItem) => !item.hidden).length > 0;
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
 *    List of all items which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<Array<IToolbarItem>>` See {@link IToolbarItem} for entities of toolbarItems.
 * @example
 * <miq-toolbar-list toolbar-list="ctrl.toolbarItems"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-list>
 */
export default class ToolbarList {
  public replace: boolean = true;
  public template = require<string>('./toolbar-list.html');
  public controller: any = ToolbarListController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    toolbarList: '<',
    onItemClick: '&'
  };
}
