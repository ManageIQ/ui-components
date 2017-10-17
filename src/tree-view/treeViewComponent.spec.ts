import TreeViewComponent from './treeViewComponent';
import * as angular from 'angular';

describe('TreeeView test', () => {
  let bindings;

  describe('controller', () => {
    let treeViewCtrl;

    beforeEach(() => {
      bindings = {
        name: 'demo-tree',
        data: '{}',
      };
      angular.mock.module('miqStaticAssets.treeView');
      angular.mock.inject($componentController => {
        treeViewCtrl = $componentController('miqTreeView', {$element: {}}, bindings);
      });
    });

    describe('findNode', () => {
      let items = [{x: 3}, {y: 4}, {z: 5}];

      beforeEach(() => {
        treeViewCtrl.tree = {getNodes: () => items};
      });

      it('returns with the requested node when found', () => {
        items.forEach(item => {
          expect(treeViewCtrl.findNode(item)).toEqual(item);
        });
      });

      it('retuns with undefined when no node was found', () => {
        expect(treeViewCtrl.findNode({a: 1})).toBeUndefined();
      });
    });
  });
});
