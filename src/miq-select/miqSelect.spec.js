describe('miq-select', function () {
  var $scope;
  var $compile;

  beforeEach(angular.mock.module('miqStaticAssets.miqSelect'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('Page with miq-select directive', function () {
    var compileSelect = function (markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it('generates correct options from ng-options', function () {
      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[1];

      var select = compileSelect('<select miq-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      $scope.$digest();

      expect(select.text()).toBe('abc');

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abc');

      var bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('b');
    });

    it('responds to changes in ng-options', function () {
      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      var select = compileSelect('<select miq-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      $scope.$digest();

      expect(select.text()).toBe('abc');

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abc');

      $scope.$apply(function () {
        $scope.options.push('d');
      });

      $scope.$digest();

      expect(select.text()).toBe('abcd');

      bsSelect = angular.element(select).siblings('.dropdown-menu');
      bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abcd');
    });

    it('responds to ng-model changes', function () {
      $scope.options = ['a','b','c'];
      $scope.modelValue = $scope.options[0];
      var select = compileSelect('<select miq-select ng-model="modelValue" ng-options="o as o for o in options"></select>', $scope);

      $scope.$digest();

      expect(select.text()).toBe('abc');

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('abc');

      var bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('a');

      $scope.$apply(function () {
        $scope.modelValue = $scope.options[1];
      });

      $scope.$digest();

      expect(select.text()).toBe('abc');

      bsSelect = angular.element(select).siblings('.dropdown-menu');
      bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('b');

      $scope.$apply(function () {
        $scope.modelValue = $scope.options[2];
      });

      $scope.$digest();

      expect(select.text()).toBe('abc');

      bsSelect = angular.element(select).siblings('.dropdown-menu');
      bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('c');
    });

    it('works correctly with ng-repeat', function() {
      $scope.options = [['1', 'one'], ['2', 'two'], ['3', 'three']];
      $scope.modelValue = $scope.options[1][0];
      var select = compileSelect('<select miq-select ng-model="modelValue" watch-model="options"><option ng-repeat="o in options" value="{{o[0]}}">{{o[1]}}</option></select>', $scope);

      $scope.$digest();

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('onetwothree');
    });

    it('responds to watch-model changes', function() {
      $scope.options = [['1', 'one'], ['2', 'two'], ['3', 'three']];
      $scope.modelValue = $scope.options[0][0];

      var select = compileSelect('<select miq-select ng-model="modelValue" watch-model="options"><option ng-repeat="o in options" value="{{o[0]}}">{{o[1]}}</option></select>', $scope);

      $scope.$digest();

      var bsSelect = angular.element(select).siblings('.dropdown-menu');
      var bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('onetwothree');
      bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('one');

      $scope.$apply(function () {
        $scope.options = [['1', 'uno'], ['2', 'dos'], ['3', 'tres']];
      });

      $scope.$digest();

      bsSelect = angular.element(select).siblings('.dropdown-menu');
      bsSelItems = bsSelect.find('li');
      expect(bsSelItems.length).toBe($scope.options.length);
      expect(bsSelItems.text()).toBe('unodostres');
      bsSelected = bsSelect.find('li.selected');
      expect(bsSelected.length).toBe(1);
      expect(bsSelected.text()).toBe('uno');
    });
  });
});
