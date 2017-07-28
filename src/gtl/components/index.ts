import dataTable from './data-table';
import tiles from './tile-view';
import pagination from './pagination';

export default (module: ng.IModule) => {
  dataTable(module);
  tiles(module);
  pagination(module);
};
