import components from './components';
import services from './services';
import * as angular from 'angular';

module fonticonPicker {
  export const app = angular.module('miqStaticAssets.fonticonPicker', ['ui.bootstrap']);
  services(app);
  components(app);
}
