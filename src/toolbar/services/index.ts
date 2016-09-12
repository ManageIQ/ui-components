import ToolbarSettingsService from './toolbarSettingsService';

export default (module: ng.IModule) => {
  module.service('MiQToolbarSettingsService', ToolbarSettingsService);
};
