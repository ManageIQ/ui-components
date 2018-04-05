describe('Pagination test', () =>  {
  let bindings,
      perPage = {
        'labelItems': 'Items',
        'enabled': true,
        'text': '20 Items',
        'value': 20,
        'hidden': false,
        'items': [{'text': '5 Items', 'value': 5, 'hidden': false, 'enabled': true}, {
          'text': '10 Items',
          'value': 10,
          'hidden': false,
          'enabled': true
        }, {'text': '20 Items', 'value': 20, 'hidden': false, 'enabled': true}, {
          'text': '50 Items',
          'value': 50,
          'hidden': false,
          'enabled': true
        }]
      },
      settings = {
        'perpage': 20,
        'current': 1,
        'items': 6,
        'total': 1,
        'startIndex': 0,
        'sortBy': {
          'sortObject': {'text': 'Messaging Name', 'sort': 'str', 'col_idx': 0, 'align': 'left'},
          'isAscending': true
        },
        'selectAllTitle': 'Select All',
        'sortedByTitle': 'Sorted By',
        'dropdownClass': ['someClass'],
        'columns': [{'is_narrow': true}, {'is_narrow': true}, {
          'text': 'Messaging Name',
          'sort': 'str',
          'col_idx': 0,
          'align': 'left'
        }, {'text': 'Messaging Type', 'sort': 'str', 'col_idx': 1, 'align': 'left'}, {
          'text': 'Server',
          'sort': 'str',
          'col_idx': 2,
          'align': 'left'
        }],
        'endIndex': 5
      };
  const onSelectAll = jasmine.createSpy('onSelectAll'),
        onChangeSort = jasmine.createSpy('onChangeSort'),
        onChangePage = jasmine.createSpy('onChangePage'),
        onChangePerPage = jasmine.createSpy('onChangePerPage');
  describe('controller', () => {
    let paginationController;

    beforeEach(() => {
      bindings = {
        settings: settings,
        perPage: perPage,
        onSelectAll: onSelectAll,
        onChangeSort: onChangeSort,
        onChangePage: onChangePage,
        onChangePerPage: onChangePerPage
      };
      angular.mock.module('miqStaticAssets.gtl');
      angular.mock.module('miqStaticAssets.common');
      angular.mock.inject(($componentController) => {
        paginationController = $componentController('miqPagination', null, bindings);
      });
    });

    it('function onSelectAll should fire correct function', () => {
      paginationController.onSelectAll(true);
      expect(onSelectAll).toHaveBeenCalledWith(true);
      paginationController.onSelectAll(false);
      expect(onSelectAll).toHaveBeenCalledWith(false);
    });

    it('function onChangeSort should fire correct function', () => {
      paginationController.onChangeSort({sortId: 1, isAscending: true});
      expect(onChangeSort).toHaveBeenCalledWith({sortId: 1, isAscending: true});
      paginationController.onChangeSort({sortId: 1, isAscending: false});
      expect(onChangeSort).toHaveBeenCalledWith({sortId: 1, isAscending: false});
    });

    it('function onChangePage should fire correct function', () => {
      paginationController.onChangePage({pageNumber: 2});
      expect(onChangePage).toHaveBeenCalledWith({pageNumber: 2});
    });

    it('function onChangePerPage should fire correct function', () => {
      paginationController.onChangePerPage({item: {some: 'string'}});
      expect(onChangePerPage).toHaveBeenCalledWith({item: {some: 'string'}});
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

      scope.settings = settings;
      scope.perPage = perPage;
      scope.hasCheckboxes = true;
      scope.onSelectAll = onSelectAll;
      scope.onChangeSort = onChangeSort;
      scope.onChangePage = onChangePage;
      scope.onChangePerPage = onChangePerPage;

      compiledElement = compile(
        angular.element(
          `<miq-pagination  settings="settings"
                            per-page="perPage"
                            has-checkboxes="hasCheckboxes"
                            on-select-all="onSelectAll(isSelected)"
                            on-change-sort="onChangeSort(sortId, isAscending)"
                            on-change-page="onChangePage(pageNumber)"
                            on-change-per-page="onChangePerPage(item)"></miq-pagination>`
        ))(scope);
      scope.$digest();
      scope.$apply();
    });

    describe('should create component', () => {
      it('select all checkbox', () => {
        expect(compiledElement[0].querySelectorAll('input[type="checkbox"][title="Select All"]').length).toBe(1);
      });

      it('sort by items', () => {
        let miqSortItems = compiledElement[0].querySelectorAll('miq-sort-items div[config="vm.options"]');
        expect(miqSortItems.length).toBe(1);
      });

      it('per page items', () => {
        expect(compiledElement[0].querySelectorAll('miq-toolbar-list').length).toBe(1);
        let perPageOptions = compiledElement[0].querySelectorAll('miq-toolbar-list ul li');
        expect(perPageOptions.length).toBe(settings.columns.length - 1);
      });

      it('pager', () => {
        expect(compiledElement[0].querySelectorAll('miq-paging').length).toBe(1);
        expect(compiledElement[0].querySelectorAll('miq-paging ul li').length).toBe(5);
      });

      it('should not render check all', () => {
        scope.hasCheckboxes = false;
        scope.$apply();
        expect(compiledElement[0].querySelectorAll('.checkbox-inline').length).toBe(0)
      });
    });

    describe('should response to', () => {
      it('selectAll action changed', () => {
        let selectAll = compiledElement[0].querySelectorAll('input[type="checkbox"][title="Select All"]');
        selectAll[0].click();
        expect(onSelectAll).toHaveBeenCalledWith(true);
        selectAll[0].click();
        expect(onSelectAll).toHaveBeenCalledWith(false);
      });

      it('selectAll action changed', () => {
        let perPageOptions = compiledElement[0].querySelectorAll('miq-toolbar-list ul li a');
        perPageOptions[0].click();
        expect(onChangePerPage).toHaveBeenCalledWith(perPage.items[0]);
        perPageOptions[1].click();
        expect(onChangePerPage).toHaveBeenCalledWith(perPage.items[1]);
      });

      it('changing settings to uncheck all items', () => {
        let selectAll = compiledElement[0].querySelectorAll('input[type="checkbox"][title="Select All"]');
        selectAll[0].click();
        expect(selectAll[0].checked).toBeTruthy();
        settings.current = 2;
        scope.settings = {...settings};
        scope.$digest();
        expect(selectAll[0].checked).toBeFalsy();
      });
    });
  });
});
