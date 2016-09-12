import DataTableService from './dataTableService';

export default (module: ng.IModule) => {
  module.service('MiQEndpointsService', DataTableService);
};
