// use together with ng-options to set extra attributes on the option elements
// use miq-options="{ attr1: 'static', attr2: expression, attr3: vm.function }"
// expression gets evaluated in each option's scope separately,
// function gets run with (scope, element)

/* @ngInject */
var miqOptions = function ($parse) {
  'use strict';

  return {
    priority: 0,
    restrict: 'A',
    link: function (scope, element, attrs) {
      var match = attrs.ngOptions.match(/for\s+(.+)\s+in\s+(.+)\s*/);
      if (!match) {
        console.warn('miqOptions: couldn\'t parse ngOptions', attrs.ngOptions);
        return;
      }
      var attrName = match[1];
      var attrToWatch = match[2];

      var parsedOptions = $parse(attrs.miqOptions);

      var updateOptions = function (newValue) {
        if (!newValue) {
          return;
        }

        var values = [];
        if (_.isArray(newValue)) {
          values = newValue;
        } else if (_.isObject(newValue)) {
          values = Object.values(newValue);
        } else {
          console.warn('miqOptions: Unknown ngOptions source', newValue);
          return;
        }

        var optionCount = angular.element('option', element).length;

        var ignoredOptions = 0;
        if (values.length === optionCount) {
          ignoredOptions = 0;
        } else if (values.length === optionCount - 1) {
          ignoredOptions = 1;
        } else {
          console.warn('miqOptions: mismatch between number of items and options', values.length, optionCount);
          return;
        }

        angular.element('option', element).each(function (i, optionElement) {
          var idx = i - ignoredOptions;
          if (idx < 0) {
            return; // skip empty option
          }

          var optionScope = scope.$new();
          optionScope.$index = idx;
          optionScope[attrName] = values[idx];

          var miqOptions = parsedOptions(optionScope);
          Object.keys(miqOptions).forEach(function(key) {
            var value = miqOptions[key];
            if (_.isFunction(value)) {
              value = value(optionScope, optionElement);
            }

            angular.element(optionElement).attr(key, value);
          });
        });
      };

      scope.$watch(attrToWatch, updateOptions);
      scope.$watchCollection(attrToWatch, updateOptions);
    },
  };
};

export default miqOptions;
