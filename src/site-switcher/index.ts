import SiteSwitcher from './siteSwitcherComponent';
import * as angular from 'angular';
module siteSwitcher {
  export const app = angular.module('miqStaticAssets.siteSwitcher', []);
  app.component('miqSiteSwitcher', new SiteSwitcher);
}
