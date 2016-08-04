import AvailableComponentsService from './../services/availableComponentsService';

export default (module: ng.IModule) => {
  /* @ngInject */
  module.config(($stateProvider: ng.ui.IStateProvider,
                 $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
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
      template: require<string>('./main.html')
    });
  });
};
