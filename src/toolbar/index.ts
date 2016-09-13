///<reference path="../tsd.d.ts"/>
import services from './services';
import components from './components';

module toolbar {
  export const app = angular.module('miqStaticAssets.toolbar', ['ngSanitize']);
  services(app);
  components(app);
}
