import EndpointsService from './endpointsService';

export default (module: ng.IModule) => {
  module.service('MiQEndpointsService', EndpointsService);
};
