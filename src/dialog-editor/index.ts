import services from './services';
import components from './components';
import * as angular from 'angular';

module dialogEditor {
  export const app = angular.module('miqStaticAssets.dialogEditor', [
    'ui.sortable',
    'ngDragDrop',
    'frapontillo.bootstrap-switch'
  ]);
  services(app);
  components(app);
}
