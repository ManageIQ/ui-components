import * as ng from 'angular';
import Quaditem from './quaditemComponent';

export default (module: ng.IModule) => {
  module.component('miqQuaditem', new Quaditem);
};
