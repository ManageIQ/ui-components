import DialogUser from './dialogUser';
import DialogField from './dialogField';
export default (module: ng.IModule) => {
  module.component('dialogUser', new DialogUser);
  module.component('dialogField',new DialogField);
};
