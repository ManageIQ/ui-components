import Toolbar from './toolbarComponent';
import ToolbarButton from './toolbarButtonDirective';
import ToolbarList from './toolbarListComponent';
import ToolbarView from './toolbarViewComponent';
import ToolbarKebab from './toolbarKebabComponent';
import ToolbarClick from './toolbarClickDirective';

export default (module: ng.IModule) => {
  module.component('miqToolbarMenu', new Toolbar);
  module.component('miqToolbarList', new ToolbarList);
  module.component('miqToolbarView', new ToolbarView);
  module.component('miqToolbarKebab', new ToolbarKebab);
  module.directive('miqToolbarClick', ToolbarClick.Factory());
  module.directive('miqToolbarButton', ToolbarButton.Factory());
};
