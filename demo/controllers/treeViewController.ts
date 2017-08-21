import * as ng from 'angular';

export default class TreeViewController {
  public node;
  public data = require('../data/tree.json');

  /*@ngInject*/
  constructor(private $scope : ng.IScope, private $timeout : ng.ITimeoutService) {};

  public resetState(node) {
    sessionStorage.clear();
  }

  public lazyLoad(node) {
    let data = require('../data/lazyTree.json');
    // Wait to simulate HTTP delay
    return new Promise(resolve => this.$timeout(() => resolve(data), 1500));
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
