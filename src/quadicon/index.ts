import components from './components';
import * as angular from 'angular';
import * as _ from 'lodash';

module quadicon {
  export const app = angular.module('miqStaticAssets.quadicon', []);
  app.filter('kebabCase', _.constant(_.kebabCase));
  components(app);
}
