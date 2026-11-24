import services from './services';
import filters from './filters';
import components from './components';
import * as angular from 'angular';

export const app: ng.IModule = angular.module('miqStaticAssets.common', []);
app.config(['$windowProvider', function($windowProvider: any) {
  const windowService = $windowProvider.$get();
  if (!Object.prototype.hasOwnProperty.call(windowService, '__')) {
    windowService.__ = (translateString: string) => translateString;
  }
}]);
services(app);
filters(app);
components(app);
