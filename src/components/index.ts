import toolbarMenu from './toolbar-menu';
import tiles from './tile-view';
import dataTable from './data-table';

import SortItems from './sortItemsComponent';

export default (module: ng.IModule) => {
  toolbarMenu(module);
  tiles(module);
  dataTable(module);

  module.component('miqSortItems', new SortItems);
};
