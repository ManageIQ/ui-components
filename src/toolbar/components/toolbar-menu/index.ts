import ToolbarClick from './toolbarClickDirective';
import ToolbarList from './toolbarListComponent';

export default (module: ng.IModule) => {
  module.component('miqToolbarList', new ToolbarList);
  module.directive('miqToolbarClick', ToolbarClick.Factory());
};
