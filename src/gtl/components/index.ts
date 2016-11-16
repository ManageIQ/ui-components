import dataTable from './data-table';
import tiles from './tile-view';

export default (module: ng.IModule) => {
  dataTable(module);
  tiles(module);
};
