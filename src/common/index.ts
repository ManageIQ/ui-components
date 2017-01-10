import services from './services';
import components from './components';
import * as angular from 'angular';

module common {
  export const app = angular.module('miqStaticAssets.common', []);
  services(app);
  components(app);
}
