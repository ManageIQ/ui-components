import EndpointsService from './endpointsService';
import ToolbarSettingsService from './toolbarSettingsService';
import DataTableService from './dataTableService';

export default (module: ng.IModule) => {
  module.service('MiQEndpointsService', EndpointsService);
  module.service('MiQToolbarSettingsService', ToolbarSettingsService);
  module.service('MiQDataTableService', DataTableService);
};
