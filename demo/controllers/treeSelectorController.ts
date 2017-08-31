import * as ng from 'angular';

const URL = '/data/lazyTree.json';

export default class TreeSelectorController {
  public data = require('../data/tree.json');
  public showTree;
  public selectedValue = 'No node selected';
  public selectables = {
      key: '(^gc-)|(^lc-)',
  };

  /*@ngInject*/
  constructor(private $http) {}

  public handleSelected = (node) => {
    this.selectedValue = node.text;
  }

  public openTreeView = (open: boolean) => {
    this.showTree = open;
  }

  public getData = (node?) => {
    return this.$http({
      method: 'GET',
      url: node ? `${URL}?id=${encodeURIComponent(node.key)}` : URL,
    }).then(response => response.data);
  }
}
