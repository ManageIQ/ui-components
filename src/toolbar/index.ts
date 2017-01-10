import services from './services';
import components from './components';
import * as angular from 'angular';

module toolbar {
  export const app = angular.module('miqStaticAssets.toolbar', ['ngSanitize']);
  services(app);
  components(app);
}
