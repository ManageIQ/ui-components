///<reference path="../tsd.d.ts"/>
import services from './services';
import components from './components';

module common {
  export const app = angular.module('miqStaticAssets.common', []);
  services(app);
  components(app);
}
