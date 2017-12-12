export default function miqPfSort() {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    template: require('./miqPfSort.html'),
    controller: function ($scope) {

      $scope.setupConfig = function () {
        var updated = false;

        if ($scope.config.fields === undefined) {
          $scope.config.fields = [];
        }

        if ($scope.config.fields.length > 0) {
          if ($scope.config.currentField === undefined) {
            $scope.config.currentField = $scope.config.fields[0];
            updated = true;
          }
          if ($scope.config.isAscending === undefined) {
            $scope.config.isAscending = true;
            updated = true;
          }
        }

        if (updated === true && $scope.config.onSortChange) {
          $scope.config.onSortChange($scope.config.currentField, $scope.config.isAscending);
        }
      };

      $scope.selectField = function (field) {
        $scope.config.currentField = field;

        if ($scope.config.onSortChange) {
          $scope.config.onSortChange($scope.config.currentField, $scope.config.isAscending);
        }
      };

      $scope.changeDirection = function () {
        $scope.config.isAscending = !$scope.config.isAscending;

        if ($scope.config.onSortChange) {
          $scope.config.onSortChange($scope.config.currentField, $scope.config.isAscending);
        }
      };

      $scope.getSortIconClass = function () {
        var iconClass;

        if ($scope.config.isAscending) {
          iconClass = 'fa fa-sort-amount-asc';
        } else {
          iconClass = 'fa fa-sort-amount-desc';
        }

        return iconClass;
      };

      $scope.setupConfig();
    },

    link: function (scope, element, attrs) {
      scope.$watch('config', function () {
        scope.setupConfig();
      }, true);
    }
  };
}
