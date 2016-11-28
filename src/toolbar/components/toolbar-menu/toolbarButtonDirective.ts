/**
 * @memberof miqStaticAssets
 * @ngdoc directive
 * @name miqToolbarButton
 * @description
 *    Directive withou controller. It will create new toolbar button in toolbar.
 *
 * @attr {Expression} onItemClick
 *    Method for handling clicking on this button (will be called with `{item: item}` object).
 * @attr {IToolbarItem} toolbarButton
 *    Toolbar item based on which will be this button generated.
 * @example
 * <miq-toolbar-button toolbar-button="toolbarButton"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-button>
 */
export default class ToolbarButton implements ng.IDirective {
  public replace: boolean = true;
  public template = require<string>('./toolbar-button.html');
  public scope: any = {
    toolbarButton: '<',
    onItemClick: '&'
  };

  public static Factory = () => {
    let directive: ng.IDirectiveFactory = () => new ToolbarButton();
    directive.$inject = [];
    return directive;
  }
}
