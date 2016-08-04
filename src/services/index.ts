import EndpointsService from './endpointsService';
import ToolbarSettingsService from './toolbarSettingsService';

export default (module: ng.IModule) => {
  module.service('MiQEndpointsService', EndpointsService);
  module.service('MiQToolbarSettingsService', ToolbarSettingsService);
};
