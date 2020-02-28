import services from './services';
import filters from './filters';
import components from './components';
import toolbarMenu from './toolbar-menu';
import * as angular from 'angular';

module gtl {
  export const app = angular.module('miqStaticAssets.gtl', []);
  services(app);
  filters(app);
  components(app);
  toolbarMenu(app);
}
