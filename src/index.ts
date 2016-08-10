///<reference path="tsd.d.ts"/>
import services from './services';
import components from './components';
import filters from './filters';

module miqStaticAssets {
  export const app = angular.module('miqStaticAssets', ['ui.bootstrap', 'ui.bootstrap.tabs', 'rx', 'ngSanitize']);
  services(app);
  components(app);
  filters(app);
}
