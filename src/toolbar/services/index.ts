import ToolbarSettingsService from './toolbarSettingsService';
import * as ng from 'angular';

export default (module: ng.IModule) => {
  module.service('MiQToolbarSettingsService', ToolbarSettingsService);
};
