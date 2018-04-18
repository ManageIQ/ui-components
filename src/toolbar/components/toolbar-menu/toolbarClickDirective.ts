export default class ToolbarClick implements ng.IDirective {
  public replace: boolean = true;
  public template = require('./toolbar-item-click.html');
  public controllerAs: string = 'vm';
  public scope: any = {
    item: '<',
    onItemClick: '&'
  };

  public static Factory = () => {
    let directive: ng.IDirectiveFactory = () => new ToolbarClick();
    directive.$inject = [];
    return directive;
  }
}
