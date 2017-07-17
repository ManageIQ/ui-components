import dataTable from './data-table';
import tiles from './tile-view';
import Pagination from './paginationComponent';

export default (module: ng.IModule) => {
  dataTable(module);
  tiles(module);
  module.component('miqPagination', new Pagination);
};
