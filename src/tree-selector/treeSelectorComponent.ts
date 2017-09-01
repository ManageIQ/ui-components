import * as ng from 'angular';

export class TreeSelectorController {
  public name: string;
  public data: any;
  public selected: any;
  public selectable: any;
  public onSelect: Function;
  public lazyLoad: Function;

  public parsedData: any;
  private rendered = false;

  public $onChanges(changes) {
    // Render the tree after the data has been sent for the first time
    if (changes.data && !this.rendered && changes.data.currentValue !== undefined) {
      this.parsedData = this.parseSelectable(this.data);
      this.rendered = true;
    }
  }

  public handleLazyLoad(node) {
    return this.lazyLoad(node).then(data => this.parseSelectable(data));
  }

  private matchSelectable(node) {
    return Object.keys(this.selectable).every(key => !!node[key].match(this.selectable[key]));
  }

  private parseSelectable(data) {
    return data.map(node => {
      const parsedData = {...node};
      if(parsedData.nodes) {
        parsedData.nodes = this.parseSelectable(parsedData.nodes);
      }
      parsedData.selectable = this.matchSelectable(parsedData);
      return parsedData;
    });
  }
}

export default class TreeSelector implements ng.IComponentOptions {
  public controller = TreeSelectorController;
  public template = require('./treeSelector.html');
  public bindings: any = {
    name: '@',
    data: '<',
    selected: '<',
    selectable: '<',
    onSelect: '&',
    lazyLoad: '&'
  };
}
