import Toolbar from './toolbarComponent';
import ToolbarButton from './toolbarButtonDirective';
import ToolbarList from './toolbarListComponent';
import ToolbarView from './toolbarViewComponent';

export default (module: ng.IModule) => {
  module.component('miqToolbarMenu', new Toolbar);
  module.component('miqToolbarList', new ToolbarList);
  module.component('miqToolbarView', new ToolbarView);
  module.directive('miqToolbarButton', ToolbarButton.Factory());
};
