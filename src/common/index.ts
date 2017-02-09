import services from './services';
import components from './components';
import * as angular from 'angular';

module common {
  export const app: ng.IModule = angular.module('miqStaticAssets.common', []);
  /*@ngInject*/
  app.config(($windowProvider: any) => {
    let windowService = $windowProvider.$get();
    if (!windowService.hasOwnProperty('__')) {
      windowService.__ = translateString => translateString;
    }
  });
  services(app);
  components(app);
}
