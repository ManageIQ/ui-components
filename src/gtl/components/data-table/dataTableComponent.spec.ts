import DataTable from './dataTableComponent';
import {DataTableController} from './dataTableComponent';

describe('DataTable test', () =>  {
  it('should create component', () => {
    const dataTableComp = new DataTable;
    expect(dataTableComp).toBeDefined();
  });

  describe('controller', () => {
    let dataTableCtrl;
    let bindings;

    let columns = [{is_narrow: true}, {is_narrow: true}, {text: 'Name', col_idx: 0}, {text: 'First value', col_idx: 1}];
    let rows = [
      {
        id: 2,
        cells: [
          {is_checkbox: true}, {image: 'some_url.jpg', icon: 'fa fa-icon'}, {text: 'first name'}, {text: 'value'}
          ]
      },
      {
        id: 3,
        cells: [
          {is_checkbox: true}, {image: 'some_url.jpg', icon: 'fa fa-icon'}, {text: 'second name'}, {text: 'value 2'}
        ]
      }
      ];
    let perPage = [{text: 5, value: 5, hidden: false, enabled: true}];
    let settings = {perpage: 5, current: 1, items: 2, total: 1, sortBy: {sortObject: {col_idx: 0}, isAscending: true}};

    const onItemSelected = jasmine.createSpy('onItemSelected'),
          onRowClick = jasmine.createSpy('onRowClick'),
          onSort = jasmine.createSpy('onSort'),
          loadMoreItems = jasmine.createSpy('loadMoreItems');

    beforeEach(() => {
      bindings = {
        rows: rows,
        columns: columns,
        perPage: perPage,
        settings: settings,
        loadMoreItems: loadMoreItems,
        onSort: onSort,
        onRowClick: onRowClick,
        onItemSelected: onItemSelected
      };
      angular.mock.module('miqStaticAssets.gtl');
      angular.mock.inject($componentController => {
        dataTableCtrl = $componentController('miqDataTable', null, bindings);
      });
    });

    it('should check all', () => {
      dataTableCtrl.onCheckAll(true);
      expect(dataTableCtrl.onItemSelected).toHaveBeenCalledTimes(rows.length);
    });

    it('should call sort function', () => {
      dataTableCtrl.onSortClick(2, true);
      expect(dataTableCtrl.onSort).toHaveBeenCalledWith({headerId: 2, isAscending: true});
    });

    it('should call loading more items after per page click', () => {
      dataTableCtrl.perPageClick(perPage[0]);
      expect(dataTableCtrl.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage[0].value});
    });

    it('should load more items after setting page', () => {
      dataTableCtrl.setPage(1);
      expect(dataTableCtrl.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage[0].value});
    });

    it('should set first page even with higher page number', () => {
      dataTableCtrl.setPage(2);
      expect(dataTableCtrl.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage[0].value});
    });

    it('should get correct column class', () => {
      expect(
        angular.equals(dataTableCtrl.getColumnClass(columns[0]), {narrow: true})
      );
      expect(
        angular.equals(dataTableCtrl.getColumnClass(columns[2]), {narrow: false})
      );
    });

    it('should check if column is icon or image', () => {
      expect(dataTableCtrl.isIconOrImage(rows[0], 1)).toBeTruthy();
      expect(dataTableCtrl.isIconOrImage(rows[0], 2)).toBeFalsy();
    });

    it('should check if filtered by column', () => {
      expect(dataTableCtrl.isFilteredBy(columns[2])).toBeTruthy();
      expect(dataTableCtrl.isFilteredBy(columns[3])).toBeFalsy();
    });

    it('should get correct sort class', () => {
      expect(
        angular.equals(
          dataTableCtrl.getSortClass(),
          {'fa-sort-asc': true, 'fa-sort-desc': false}
        )
      );
      settings.sortBy.isAscending = false;
      expect(
        angular.equals(
          dataTableCtrl.getSortClass(),
          {'fa-sort-asc': false, 'fa-sort-desc': true}
        )
      );
    });
  });

  describe('component', () => {
    let scope, compile, compiledElement;
    beforeEach(() => {
      angular.mock.module('miqStaticAssets.gtl');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      compiledElement = compile(
        angular.element(
          `<miq-data-table></miq-data-table>`
        ))(scope);
      scope.$digest();
    });
  });
});
