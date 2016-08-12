import StateAndViewFilter from './stateAndView';

export default (module: ng.IModule) => {
  module.filter('filterByStateAndView', StateAndViewFilter.filter);
};
