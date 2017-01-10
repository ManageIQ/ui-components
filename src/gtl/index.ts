import services from './services';
import filters from './filters';
import components from './components';
import * as angular from 'angular';

module gtl {
  export const app = angular.module('miqStaticAssets.gtl', []);
  services(app);
  filters(app);
  components(app);
}
