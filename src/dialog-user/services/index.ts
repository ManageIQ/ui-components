import DialogDataService from './dialogData';

export default (module: ng.IModule) => {
  module.service('DialogData', DialogDataService);
};
