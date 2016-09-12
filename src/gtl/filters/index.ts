import LimitToSuffix from './limitToSuffixFilter';

export default (module: ng.IModule) => {
  module.filter('limitToSuffix', LimitToSuffix.filter);
};
