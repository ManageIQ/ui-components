import AvailableComponentsController from './availableComponentsController';
import ToolbarMenuController from './toolbarMenuController';
import DataTableController from './dataTableController';
import SiteSwitcherController from './siteSwitcherController';
import FonticonPickerController from './fonticonPickerController';
import DialogUserController from './dialogUserController';
import DialogEditorController from './dialogEditorController';
import * as ng from 'angular';

export default (module: ng.IModule) => {
  module.controller('demoAvailableComponents', AvailableComponentsController);
  module.controller('demoToolbarMenu', ToolbarMenuController);
  module.controller('demoDataTable', DataTableController);
  module.controller('demoSiteSwitcher', SiteSwitcherController);
  module.controller('demoFonticonPicker', FonticonPickerController);
  module.controller('demoDialogUser', DialogUserController);
  module.controller('demoDialogEditor', DialogEditorController);
};
