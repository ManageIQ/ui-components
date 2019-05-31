import services from './services';
import components from './components';
import * as angular from 'angular';

module dialogUser {
  export const app = angular.module('miqStaticAssets.dialogUser',[]);
  services(app);
  components(app);
}
