import AvailableComponentsService from './../services/availableComponentsService';
import * as angular from 'angular';

export default (module: angular.IModule) => {
  /* @ngInject */
  module.config(($stateProvider: any,
                 $urlRouterProvider: any,
                 $locationProvider: any) => {
    // Configure location provider for hash-based routing
    $locationProvider.hashPrefix('');

    const allComponents = new AvailableComponentsService();
    angular.forEach(allComponents.availableComponents, (oneGroup) => {
      angular.forEach(oneGroup.components, (oneComp) => {
        $stateProvider.state(oneGroup.name + oneComp.name, {
          url: oneGroup.location + oneComp.location,
          template: oneComp.template,
          controller: oneComp.controller
        });
      });
    });
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
      url: '/',
      template: require('./main.html')
    });
  });
};
