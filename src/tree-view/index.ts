import TreeView from './treeViewComponent';
import * as angular from 'angular';
module treeView {
  export const app = angular.module('miqStaticAssets.treeView', []);
  app.component('miqTreeView', new TreeView);
}
