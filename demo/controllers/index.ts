import AvailableComponentsController from './availableComponentsController';
import DialogUserController from './dialogUserController';
import TreeViewController from './treeViewController';
import TreeSelectorController from './treeSelectorController';
import * as ng from 'angular';

export default (module: ng.IModule) => {
  module.controller('demoAvailableComponents', AvailableComponentsController);
  module.controller('demoDialogUser', DialogUserController);
  module.controller('demoTreeView', TreeViewController);
  module.controller('demoTreeSelector', TreeSelectorController);
};
