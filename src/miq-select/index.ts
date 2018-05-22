import MiqSelect from './miqSelect';
import * as angular from 'angular';

module miqSelect {
  export const app = angular.module('miqStaticAssets.miqSelect', []);
  app.directive('miqSelect', MiqSelect);
}
