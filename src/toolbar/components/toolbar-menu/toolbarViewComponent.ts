/**
 * Bindings to toolbar view.
 *   * toolbarViews
 *   * onItemClick
 * @interface
 */
export interface IToolbarViewBindings {
  toolbarViews: any;
  onItemClick: (args: {item: any, $event: any}) => void;
}

/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarViewController
 * @implements {IToolbarViewBindings}
 */
export class ToolbarViewController implements IToolbarViewBindings {
  public toolbarViews: any;
  public onItemClick: (args: {item: any}) => void;
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarView
 * @description
 *    Component which will generate list in toolbar with toolbarItems as dropdown menu.
 *
 * @attr {Expression} onItemClick
 *    Method which will be executed when clicked on view.
 * @attr {Array} toolbarViews
 *    List of all views which are used in toolbar.
 * @example
 * <miq-toolbar-view toolbar-views="ctrl.toolbarViews"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-view>
 */
export default class ToolbarView {
  public replace: boolean = false;
  public template = require<string>('./toolbar-view.html');
  public controller: any = ToolbarViewController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    toolbarViews: '<',
    onItemClick: '&'
  };
}
