import services from './services';
import components from './components';
import * as angular from 'angular';

module topologyGraph {
  export const app = angular.module('miqStaticAssets.topologyGraph', []);
  services(app);
  components(app);
}
