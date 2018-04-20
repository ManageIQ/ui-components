import AbbrNumber from './abbrNumberFilter';
import AdjustColor from './adjustColorFilter';

export default (module: ng.IModule) => {
  module.filter('abbrNumber', AbbrNumber.filter);
  module.filter('adjustColor', AdjustColor.filter);
};
