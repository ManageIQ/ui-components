import TreeSelector from './treeSelectorComponent';
import * as angular from 'angular';

export const app = angular.module('miqStaticAssets.treeSelector', []);
app.component('miqTreeSelector', new TreeSelector());
