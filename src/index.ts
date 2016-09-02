///<reference path="tsd.d.ts"/>
import services from './services';
import components from './components';

module miqStaticAssets {
  export const app = angular.module('miqStaticAssets', ['rx', 'ngSanitize']);
  services(app);
  components(app);
}
