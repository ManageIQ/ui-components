import MiqSelect from './miqSelect';
import MiqOptions from './miqOptions';
import * as angular from 'angular';

module miqSelect {
  export const app = angular.module('miqStaticAssets.miqSelect', []);
  app.directive('miqSelect', MiqSelect);
  app.directive('miqOptions', MiqOptions);
}
