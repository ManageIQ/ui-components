import Dialog from './dialog';
import DialogField from './dialogField';
export default (module: ng.IModule) => {
  module.component('dialog', new Dialog);
  module.component('dialogField',new DialogField);
};
