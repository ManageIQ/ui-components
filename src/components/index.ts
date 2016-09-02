import toolbarMenu from './toolbar-menu';
import tiles from './tile-view';
import dataTable from './data-table';

export default (module: ng.IModule) => {
  toolbarMenu(module);
  tiles(module);
  dataTable(module);
};
