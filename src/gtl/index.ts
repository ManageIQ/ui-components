///<reference path="../tsd.d.ts"/>
import services from './services';
import filters from './filters';
import components from './components';

module gtl {
  export const app = angular.module('miqStaticAssets.gtl', []);
  services(app);
  filters(app);
  components(app);
}
