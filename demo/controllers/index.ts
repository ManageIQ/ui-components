///<reference path="../tsd.d.ts"/>
import AvailableComponentsController from './availableComponentsController';
import ToolbarMenuController from './toolbarMenuController';
import DataTableController from './dataTableController';

export default (module: ng.IModule) => {
  module.controller('demoAvailableComponents', AvailableComponentsController);
  module.controller('demoToolbarMenu', ToolbarMenuController);
  module.controller('demoDataTable', DataTableController);
};
