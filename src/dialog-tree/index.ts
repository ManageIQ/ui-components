//import services from './services';
import components from './components';
import * as angular from 'angular';

module dialogTree {
  export const app = angular.module('miqStaticAssets.dialogTree', ['ui.sortable']);
  components(app);
}
