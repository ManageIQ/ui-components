import * as ng from 'angular';

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
