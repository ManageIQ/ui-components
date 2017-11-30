// import DataTable from './dataTableComponent';

describe('DataTable test', () =>  {
  let bindings;

  let columns = [{is_narrow: true}, {is_narrow: true}, {text: 'Name', col_idx: 0}, {text: 'First value', col_idx: 1}];
  let rows = [
    {
      id: 2,
      cells: [
        {is_checkbox: true},
        {image: 'some_url.jpg', icon: 'fa fa-icon'},
        {text: 'first name'},
        {is_button: true, onclick: 'window'}
      ],
    },
    {
      id: 3,
      cells: [
        {is_checkbox: true}, {image: 'some_url.jpg'}, {text: 'second name'}, {text: 'value 2'}
      ]
    },
    {
      id: 4,
      cells: [
        {is_checkbox: true}, {picture: 'some_url.jpg', icon: 'fa fa-icon'}, {text: 'second name'}, {text: 'value 2'}
      ]
    }
  ];
  let perPage = {
    label: 'Items per page',
    enabled: true,
    hidden: false,
    text: 5,
    value: 5,
    items: [{text: 5, value: 5, hidden: false, enabled: true}]
  };
  let settings = {perpage: 5, current: 1, items: 2, total: 1, sortBy: {sortObject: {col_idx: 0}, isAscending: true}};

  const onItemSelected = jasmine.createSpy('onItemSelected', (item: any, isSelected: boolean) => true),
        onRowClick = jasmine.createSpy('onRowClick', (item: any) => true),
        onSort = jasmine.createSpy('onSort', (headerId: any, isAscending: boolean) => true),
        loadMoreItems = jasmine.createSpy('loadMoreItems', (start: number, perPage: number) => true);

  describe('controller', () => {
    let dataTableCtrl;

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
      angular.mock.module('miqStaticAssets.common');
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
      dataTableCtrl.perPageClick(perPage.items[0]);
      expect(dataTableCtrl.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage.items[0].value});
    });

    it('should load more items after setting page', () => {
      dataTableCtrl.setPage(1);
      expect(dataTableCtrl.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage.items[0].value});
    });

    it('should set first page even with higher page number', () => {
      dataTableCtrl.setPage(2);
      expect(dataTableCtrl.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage.items[0].value});
    });

    it('should get correct column class', () => {
      expect(
        angular.equals(dataTableCtrl.getColumnClass(columns[0]), {narrow: true, 'table-view-pf-select': true})
      ).toBeTruthy();
      expect(
        angular.equals(dataTableCtrl.getColumnClass(columns[2]), {narrow: undefined, 'table-view-pf-select': undefined})
      ).toBeTruthy();
    });

    it('should check if column renders an icon', () => {
      expect(dataTableCtrl.getNodeIconType(rows[0], 1)).toEqual('icon');
    });

    it('should check if column renders an image', () => {
      expect(dataTableCtrl.getNodeIconType(rows[1], 1)).toEqual('image');
    });

    it('should check if column renders a picture', () => {
      expect(dataTableCtrl.getNodeIconType(rows[2], 1)).toEqual('picture');
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

    it('should validate page number if wrong number is inserted', () => {
      dataTableCtrl.setTablePage('-1');
      expect(dataTableCtrl.settings.current).toBe(1);
      dataTableCtrl.setTablePage('d');
      expect(dataTableCtrl.settings.current).toBe(1);
    });
  });

  describe('component', () => {
    let scope, compile, compiledElement;
    beforeEach(() => {
      angular.mock.module('miqStaticAssets.common');
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.module('miqStaticAssets.gtl');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.rows = rows;
      scope.perPage = perPage;
      scope.columns = columns;
      scope.settings = settings;
      scope.loadMoreItems = loadMoreItems;
      scope.onSort = onSort;
      scope.onRowClick = onRowClick;
      scope.onItemSelected = onItemSelected;

      compiledElement = compile(
        angular.element(
          `<miq-data-table rows="rows"
                           columns="columns"
                           per-page="perPage"
                           settings="settings"
                           load-more-items="onLoadMoreItems(start, perPage)"
                           on-sort="onSort(headerId, isAscending)"
                           on-row-click="onRowClick(item)"
                           on-item-selected="onItemSelect(item, isSelected)"></miq-data-table>`
        ))(scope);
      scope.$digest();
    });

    it('creates table head', () => {
      let header = compiledElement[0].querySelector('.miq-table-with-footer thead');
      expect(header).toBeDefined();
      expect(header.querySelectorAll('th').length).toBe(columns.length);
      let filteredByIndex = columns.map((column: any) => column.col_idx).indexOf(settings.sortBy.sortObject.col_idx);
      expect(header.querySelectorAll('th')[filteredByIndex].innerHTML).toContain('Name');
      expect(header.querySelectorAll('th i.fa')).toBeDefined();
    });

    it('clicking on button should not call onRowClick', () => {
      let button = compiledElement.find('tbody tr td button');
      button.click();
      expect(scope.onRowClick).not.toHaveBeenCalled();
    });

    it('clicking on cell should call onRowClick', () => {
      let cell = compiledElement.find('tbody tr td');
      cell.click();
      expect(scope.onRowClick).toHaveBeenCalled();
    });

    xit('creates tbody', () => {
      let body = compiledElement[0].querySelector('.miq-table-with-footer tbody');
      expect(body.querySelectorAll('tr').length).toBe(rows.length);
      let firstRowTds = body.querySelectorAll('tr')[0].querySelectorAll('td');
      expect(firstRowTds.length).toBe(rows[0].cells.length);
      expect(firstRowTds[0].querySelector('input')).toBeDefined();
      expect(firstRowTds[0].querySelector('i.fa')).toBeDefined();
      expect(firstRowTds[2].innerHTML).toContain(rows[0].cells[2]['text']);
      expect(firstRowTds[3].innerHTML).toContain(rows[0].cells[3]['text']);
    });
  });
});
