import AvailableComponentsController from './availableComponentsController';
import DataTableController from './dataTableController';
import FonticonPickerController from './fonticonPickerController';
import DialogUserController from './dialogUserController';
import DialogEditorController from './dialogEditorController';
import QuadiconController from './quadiconController';
import TreeViewController from './treeViewController';
import TreeSelectorController from './treeSelectorController';
import * as ng from 'angular';

export default (module: ng.IModule) => {
  module.controller('demoAvailableComponents', AvailableComponentsController);
  module.controller('demoDataTable', DataTableController);
  module.controller('demoFonticonPicker', FonticonPickerController);
  module.controller('demoDialogUser', DialogUserController);
  module.controller('demoDialogEditor', DialogEditorController);
  module.controller('demoQuadicon', QuadiconController);
  module.controller('demoTreeView', TreeViewController);
  module.controller('demoTreeSelector', TreeSelectorController);
};
