///
/// Copyright 2015-2016 Red Hat, Inc. and/or its affiliates
/// and other contributors as indicated by the @author tags.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///    http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

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
