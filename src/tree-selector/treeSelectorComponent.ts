import * as ng from 'angular';

export class TreeSelectorController {
  public data: any;
  public selectables: any;
  public display: any;
  public onSelect: any;
  public lazyLoad: any;
  public name: string;

  /*@ngInject*/
  constructor(private $http, private $timeout : ng.ITimeoutService) {
  }

  public $onInit() {
    this.data = this.parseSelectable(this.data);
  }

  public matchSelectable(node) {
    return Object.keys(this.selectables).map((key) =>
      !!node[key].match(this.selectables[key])
    ).every(bool => bool);
  }

  public handleLazyLoad = (node) => {
    const dataPromise = this.lazyLoad(node);
    return dataPromise().then((data) => {
      return this.parseSelectable(data);
    });
  }

  public parseSelectable = (data: any) => {
    return data.map((node, key) => {
      const parsedData = {...node};
      if(parsedData.nodes) {
        parsedData.nodes = this.parseSelectable(parsedData.nodes);
      }
      parsedData.selectable = this.matchSelectable(parsedData);
      return parsedData;
    });
  }

  public handleSelect = (data) => {
    this.onSelect({node: data.node});
    this.display({open: false});
  }
}

export default class TreeSelector implements ng.IComponentOptions {
  public controller = TreeSelectorController;
  public template = require('./treeSelector.html');
  public bindings: any = {
    data: '<',
    name: '@',
    selectables: '<',
    display: '&',
    onSelect: '&',
    lazyLoad: '&'
  };
}
