import * as ng from 'angular';
import FonticonPicker from './fonticonPickerComponent';

export default (module: ng.IModule) => {
  module.component('miqFonticonPicker', new FonticonPicker);
};
