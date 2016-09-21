///<reference path="../tsd.d.ts"/>
import services from './services';
import filters from './filters';

module gtl {
  export const app = angular.module('miqStaticAssets.gtl', []);
  services(app);
  filters(app);
}
