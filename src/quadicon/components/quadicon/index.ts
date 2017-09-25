import * as ng from 'angular';
import Quadicon from './quadiconComponent';

export default (module: ng.IModule) => {
  module.component('miqQuadicon', new Quadicon);
};
