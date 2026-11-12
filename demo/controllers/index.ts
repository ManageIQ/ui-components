import AvailableComponentsController from './availableComponentsController';
import FonticonPickerController from './fonticonPickerController';
import DialogUserController from './dialogUserController';
import DialogEditorController from './dialogEditorController';
import TreeViewController from './treeViewController';
import TreeSelectorController from './treeSelectorController';
import * as ng from 'angular';

export default (module: ng.IModule) => {
  module.controller('demoAvailableComponents', AvailableComponentsController);
  module.controller('demoFonticonPicker', FonticonPickerController);
  module.controller('demoDialogUser', DialogUserController);
  module.controller('demoDialogEditor', DialogEditorController);
  module.controller('demoTreeView', TreeViewController);
  module.controller('demoTreeSelector', TreeSelectorController);
};
