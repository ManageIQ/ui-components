import SiteSwitcher from './siteSwitcherComponent';

module siteSwitcher {
  export const app = angular.module('miqStaticAssets.siteSwitcher', []);
  app.component('miqSiteSwitcher', new SiteSwitcher);
}
