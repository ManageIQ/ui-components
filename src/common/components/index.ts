import SortItems from './sortItemsComponent';
import miqPfSort from './miqPfSort';

export default (module: ng.IModule) => {
  module.component('miqSortItems', new SortItems);
  module.directive('miqPfSort', miqPfSort);
};
