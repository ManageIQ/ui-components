import * as ng from 'angular';
import {ComponentDemo} from '../services/availableComponentBuilder';
@ComponentDemo({
  name: 'tree-view',
  title: 'TreView',
  template: require('./../views/tree-view/basic.html'),
  group: 'tree-view',
  controller: 'demoTreeView as vm'
})
export default class TreeViewController {
  public node;
  public data = require('../data/tree.json');
  public selectNode;

  /*@ngInject*/
  constructor(private $scope : ng.IScope, private $timeout : ng.ITimeoutService, private $window : ng.IWindowService) {
  };

  public resetState() {
    sessionStorage.clear();
    this.$window.location.reload();
  }

  public selectRandom() {
    let keys = JSON.stringify(this.data)
      .match(/\"key\":\"[^\"]+\"/g)
      .map((item) => item.replace(/\"key\":\"([^\"]+)\"/, '$1'));
    let key = keys[Math.floor(Math.random() * keys.length)];

    this.selectNode = { key: key };
  }

  public selectLazy() {
    this.selectNode = [{key: 'lp-1'}, {key: 'lc-2'}, {key: 'lgc-1'}];
  }

  public lazyLoad(node) {
    let data = require('../data/lazyTree.json');
    // Wait to simulate HTTP delay
    return new Promise(resolve => this.$timeout(() => resolve(data), 1500));
  }

  public reloadData() {
    this.data = require('../data/lazyTree.json');
  }

  public nodeSelect(node) {
    // Drop some attributes to keep the output short
    delete node.$el;
    delete node.nodes;
    delete node.searchResult;

    this.node = node;
    this.$scope.$apply();
  }
}
