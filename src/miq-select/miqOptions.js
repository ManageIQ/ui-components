// use together with ng-options to set extra attributes on the option elements
// use miq-options="{ attr1: 'static', attr2: vm.function }", where function gets run for each such element
var miqOptions = function ($parse) {
  'use strict';

  return {
    priority: 0,
    restrict: 'A',
    link: function (scope, element, attrs) {
      var miqOptions = $parse(attrs.miqOptions)(scope);

      var match = attrs.ngOptions.match(/for\s+.+\s+in\s+(.+)\s*/);
      if (!match) {
        return;
      }
      var attrToWatch = match[1];

      scope.$watch(attrToWatch, function (newValue) {
        if (!newValue) {
          return;
        }

        angular.element('option', element).each(function (_i, e) {
          Object.keys(miqOptions).forEach(function(k) {
            var v = miqOptions[k];
            if (_.isFunction(v)) {
              v = v(e);
            }

            angular.element(e).attr(k, v);
          });
        });
      });
    },
  };
};

miqOptions.$inject = ['$parse'];

export default miqOptions;
