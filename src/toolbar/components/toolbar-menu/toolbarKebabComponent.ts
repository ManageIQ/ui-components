class ToolbarKebabController {
  public items;
  public onItemClick: (args: {item: any, $event: any}) => void;
}

export default class ToolbarKebab {
  public template = require('./toolbar-kebab.html');
  public controller: any = ToolbarKebabController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    kebabItem: '<',
    onItemClick: '&'
  };
}
