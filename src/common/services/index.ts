import EndpointsService from './endpointsService';
import TranslateService from './translateService';

export default (module: ng.IModule) => {
  module.service('MiQEndpointsService', EndpointsService);
  module.service('MiQTranslateService', TranslateService);
};
