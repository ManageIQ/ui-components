import DialogTreeWrapper from './dialogTreeWraperComponent';

export default (module: ng.IModule) => {
  module.component('dialogTreeWrapper', new DialogTreeWrapper);
};
