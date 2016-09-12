///<reference path="../tsd.d.ts"/>
import services from './services';

module common {
  export const app = angular.module('miqStaticAssets.common', []);
  services(app);
}
