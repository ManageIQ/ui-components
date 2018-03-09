describe('tile component test', () =>  {
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
  let perPage = {
    label: 'Items per page',
    enabled: true,
    hidden: false,
    text: 5,
    value: 5,
    items: [{text: 5, value: 5, hidden: false, enabled: true}]
  };
  let settings = {perpage: 5, current: 1, items: 2, total: 1, sortBy: {
    sortObject: columns[2], isAscending: true}
  };

  const onItemSelected = jasmine.createSpy('onItemSelected'),
    onRowClick = jasmine.createSpy('onRowClick'),
    onSort = jasmine.createSpy('onSort'),
    loadMoreItems = jasmine.createSpy('loadMoreItems');

  describe('controller', () => {
    let tileController, sce;
    beforeEach(() => {
      bindings = {
        type: 'small',
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
      angular.mock.inject(($componentController, $sce) => {
        sce = $sce;
        tileController = $componentController('miqTileView', null, bindings);
      });
    });

    it('should create controller and init options', () => {
      expect(tileController).toBeDefined();
      expect(tileController.options.selectionMatchProp).toBe('id');
      expect(tileController.options.selectItems).toBeFalsy();
      expect(tileController.options.multiSelect).toBeTruthy();
      expect(tileController.options.showSelectBox).toBeTruthy();
      expect(tileController.options.onClick instanceof Function).toBeTruthy();
      expect(tileController.options.onItemClick instanceof Function).toBeTruthy();
      expect(tileController.options.fetchTileName instanceof Function).toBeTruthy();
      expect(tileController.options.trustAsHtmlQuadicon instanceof Function).toBeTruthy();
      expect(tileController.options.type).toBe(bindings.type);
    });

    it('should get correct class based on tile type', () => {
      expect(
        angular.equals(
          tileController.tileClass(),
          {
            'miq-small-tile': true,
            'miq-tile-with-body': false,
          }
        )
      );

      tileController.type = 'big';
      expect(
        angular.equals(
          tileController.tileClass(),
          {
            'miq-small-tile': false,
            'miq-tile-with-body': true,
          }
        )
      );
    });

    it('should check all', () => {
      tileController.onCheckAllTiles(true);
      expect(tileController.onItemSelected).toHaveBeenCalledTimes(rows.length);
    });

    it('should call sort function', () => {
      tileController.onSortClick(2, true);
      expect(tileController.onSort).toHaveBeenCalledWith({headerId: 2, isAscending: true});
    });

    it('should call loading more items after per page click', () => {
      tileController.perPageClick(perPage.items[0]);
      expect(tileController.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage.items[0].value});
    });

    it('should load more items after setting page', () => {
      tileController.setPage(1);
      expect(tileController.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage.items[0].value});
    });

    it('should set first page even with higher page number', () => {
      tileController.setPage(2);
      expect(tileController.loadMoreItems).toHaveBeenCalledWith({start: 0, perPage: perPage.items[0].value});
    });

    it('should trust as html quadicon', () => {
      let htmlContent = {quadicon: '<div>Some content</div>'};
      expect(
        angular.equals(
          tileController.trustAsHtmlQuadicon(htmlContent),
          sce.trustAsHtml(htmlContent.quadicon)
        )
      ).toBeTruthy();
    });

    it('should fetch filename', () => {
      expect(tileController.fetchTileName(rows[0])).toBe(rows[0].cells[2]['text']);
    });

    it('should perform on tile click', () => {
      tileController.onTileClick(rows[0]);
      expect(tileController.onItemSelected).toHaveBeenCalledWith({item: rows[0], isSelected: true});
    });

    it('should filter selected items', () => {
      expect(!!tileController.rows[0].checked).toBeFalsy();
      tileController.rows[0].checked = true;
      expect(angular.equals([rows[0]],tileController.filterSelected())).toBeTruthy();
    });

    it('should count checkboxes', () => {
      expect(tileController.countCheckboxes()).toBe(2);

      tileController.rows = tileController.rows.map(oneRow => {
        oneRow.cells[0].is_checkbox = false;
        return oneRow;
      });

      expect(tileController.countCheckboxes()).toBe(0);
    });

    it('should count checkboxes for rows with cells', () => {
      tileController.rows = tileController.rows.map(oneRow => {
        oneRow.cells = undefined;
        return oneRow;
      });

      expect(tileController.countCheckboxes()).toBe(0);
    });
  });

  describe('component', () => {
    let scope, compile, compiledElement;
    beforeEach(() => {
      angular.mock.module('miqStaticAssets');
      angular.mock.module('miqStaticAssets.common');
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.type = 'big';
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
          `<miq-tile-view  type="type"
                           rows="rows"
                           columns="columns"
                           per-page="perPage"
                           settings="settings"
                           load-more-items="onLoadMoreItems(start, perPage)"
                           on-sort="onSort(headerId, isAscending)"
                           on-row-click="onRowClick(item)"
                           on-item-selected="onItemSelect(item, isSelected)"></miq-tile-view>`
        ))(scope);
      scope.$digest();
      scope.$apply();
    });

    it('should show per page picker', () => {
      expect(compiledElement[0].querySelectorAll('miq-toolbar-list li').length).toBe(1);
    });

    it('should show paging at top', () => {
      let paging = compiledElement[0].querySelectorAll('miq-paging');
      expect(paging.length).toBe(1);
    });

    it('should contain card view', () => {
      expect(compiledElement[0].querySelector('pf-card-view')).toBeDefined();
    });
  });
});
