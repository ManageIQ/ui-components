import TreeView from './treeViewComponent';
import * as angular from 'angular';
export const app = angular.module('miqStaticAssets.treeView', []);
app.component('miqTreeView', new TreeView());
