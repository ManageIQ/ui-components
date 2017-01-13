import SortItems from './sortItemsComponent';
import * as angular from 'angular';

describe('Sort items test', () =>  {
  let headers = [{is_narrow: true}, {col_id: 2, text: 'something'}, {col_id: 3, text: 'something2'}];
  let sortObject = {sortObject: {col_id: 3, text: 'something2'}, isAscending: true};

  it('should create component', () => {
    let sortItems = new SortItems;
    expect(sortItems).toBeDefined();
  });

  describe('controller', () => {
    let sortItemsCtrl;
    const onSort = jasmine.createSpy('onSort');

    beforeEach(() => {
      let bindings = {
        onSort: onSort,
        headers: headers,
        sortObject: sortObject,
        dropDownClass: ['someClass']
      };
      angular.mock.module('miqStaticAssets.common');
      angular.mock.inject(($componentController) => {
        sortItemsCtrl = $componentController('miqSortItems', {$element: angular.element()}, bindings);
      });
    });

    it('should init options', () => {
      expect(sortItemsCtrl.options.fields.length).toBe(0);
      expect(sortItemsCtrl.options.currentField).toBeDefined();
      expect(sortItemsCtrl.options.hasOwnProperty('onSortChange')).toBeTruthy();
    });

    it('should set sort item', () => {
      sortItemsCtrl.headers = headers;
      sortItemsCtrl.sortObject = {sortObject: {col_id: 3, text: 'something2'}, isAscending: true};
      sortItemsCtrl.setSortItem();
      expect(sortItemsCtrl.options.currentField.colId).toBe(2);
      expect(sortItemsCtrl.options.currentField.id).toBe(sortItemsCtrl.sortObject.sortObject.text);
      expect(sortItemsCtrl.options.currentField.title).toBe(sortItemsCtrl.sortObject.sortObject.text);
    });
  });

  describe('component', () => {
    let scope, compile, compiledElement;

    beforeEach(() => {
      angular.mock.module('miqStaticAssets.common');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.headers = headers;
      compiledElement = compile(
        angular.element(
          `<miq-sort-items on-sort="onSort(sortObject, isAscending)"
                           headers="headers"
                           sort-object="currentSortObject"></miq-sort-items>`
        ))(scope);
      scope.$digest();
    });

    it('should compile component', () => {
      expect(compiledElement.html()).toContain('pf-sort');
      expect(compiledElement.html()).toContain('config="vm.options"');
    });
  });
});
