import AbbrNumber from './abbrNumberFilter';

export default (module: ng.IModule) => {
  module.filter('abbrNumber', AbbrNumber.filter);
};
