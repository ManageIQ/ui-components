import views from './views';
import controllers from './controllers';
import * as angular from 'angular';
import TranslateFilter from './services/translateFilter';
import DialogEditorHttpService from './services/DialogEditorHttpService';

export const app = angular.module('demoApp', [
  'ui.sortable', 'ngDragDrop', 'frapontillo.bootstrap-switch', 'miqStaticAssets', 'ui.bootstrap', 'ui.router',
  'patternfly.form', 'patternfly.select', 'ui.bootstrap.tabs', 'patternfly.views', 'ngAnimate'
]);
controllers(app);
views(app);
app.filter('translate', TranslateFilter.filter);
app.service('DialogEditorHttp', DialogEditorHttpService);
