import services from './services';
import filters from './filters';
import components from './components';
import * as angular from 'angular';

module common {
  export const app: ng.IModule = angular.module('miqStaticAssets.common', []);
  app.config(['$windowProvider', function($windowProvider: any) {
    let windowService = $windowProvider.$get();
    if (!windowService.hasOwnProperty('__')) {
      windowService.__ = (translateString: any) => translateString;
    }
  }]);
  services(app);
  filters(app);
  components(app);
}
