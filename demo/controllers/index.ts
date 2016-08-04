///<reference path="../tsd.d.ts"/>
import AvailableComponentsController from './availableComponentsController';
import ToolbarMenuController from './toolbarMenuController';

export default (module: ng.IModule) => {
  module.controller('demoAvailableComponents', AvailableComponentsController);
  module.controller('demoToolbarMenu', ToolbarMenuController);
};
