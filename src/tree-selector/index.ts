import TreeSelector from './treeSelectorComponent';
import * as angular from 'angular';

module treeSelector {
  export const app = angular.module('miqStaticAssets.treeSelector', []);
  app.component('treeSelector', new TreeSelector);
}
