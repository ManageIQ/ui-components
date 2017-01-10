import views from './views';
import controllers from './controllers';
import * as angular from 'angular';

export const app = angular.module('demoApp', ['miqStaticAssets', 'ui.bootstrap', 'ui.router',
  'patternfly.select', 'ui.bootstrap.tabs', 'patternfly.views', 'ngAnimate']);
controllers(app);
views(app);
