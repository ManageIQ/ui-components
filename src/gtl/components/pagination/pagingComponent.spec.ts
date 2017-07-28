describe('paging component test', () =>  {

  const onChangePage = jasmine.createSpy('onChangePage');
  describe('controller', () => {
    let settings = {perpage: 5, current: 1, items: 6, total: 2, sortBy: {sortObject: {col_idx: 0}, isAscending: true}};
    let pagingCtrl, bindings;
    beforeEach(() => {
      bindings = {
        settings: settings,
        onChangePage: onChangePage
      };
      angular.mock.module('miqStaticAssets.gtl');
      angular.mock.inject($componentController => {
        pagingCtrl = $componentController('miqPaging', null, bindings);
      });
    });

    it('should be defined', () => {
      expect(pagingCtrl).toBeDefined();
    });

    it('should create non limited array pages', () => {
      expect(pagingCtrl.updatePages(2).length).toBe(2);
    });

    it('should create limited number of pages', () => {
      pagingCtrl.settings.total = 10;
      pagingCtrl.settings.current = 9;
      expect(pagingCtrl.updatePages(10).length).toBe(6);
      expect(angular.equals(pagingCtrl.pages, [4, 5, 6, 7, 8, 9])).toBeTruthy();
    });
  });

  describe('component', () => {
    let settings = {perpage: 5, current: 1, items: 6, total: 2, sortBy: {sortObject: {col_idx: 0}, isAscending: true}};
    let scope, compile, compiledElement;
    beforeEach(() => {
      angular.mock.module('miqStaticAssets.gtl');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
      scope.settings = settings;
      scope.onChangePage = onChangePage;
      compiledElement = compile(
        angular.element(
          `<miq-paging settings="settings"
                       on-change-page="onChangePage(pageNumber)"></miq-paging>`
        ))(scope);
      scope.$digest();
    });

    it('should create paging', () => {
      let pagination = compiledElement[0].querySelector('.pagination');
      expect(pagination).toBeDefined();
      expect(pagination.querySelectorAll('li').length).toBe(scope.settings.total + 4);
      expect(pagination.querySelector('li.fa-angle-double-left')).toBeDefined();
      expect(pagination.querySelector('li.fa-angle-left')).toBeDefined();
      expect(pagination.querySelector('li.fa-angle-double-right')).toBeDefined();
      expect(pagination.querySelector('li.fa-angle-right')).toBeDefined();
    });

    it('should change disabled items after selecting different page', () => {
      let pagination = compiledElement[0].querySelector('.pagination');
      let firstItem = pagination.querySelectorAll('li')[2];
      let secondItem = pagination.querySelectorAll('li')[3];
      expect(firstItem.querySelector('a').classList.contains('disabled')).toBeTruthy();
      expect(secondItem.querySelector('a').classList.contains('disabled')).toBeFalsy();
      scope.settings.current = 2;
      scope.$digest();
      expect(firstItem.querySelector('a').classList.contains('disabled')).toBeFalsy();
      expect(secondItem.querySelector('a').classList.contains('disabled')).toBeTruthy();
    });

    it('should call on change page after clicking on page', () => {
      let pagination = compiledElement[0].querySelector('.pagination');
      let secondItem = pagination.querySelectorAll('li')[3];
      secondItem.querySelector('a').click();
      expect(onChangePage).toHaveBeenCalledWith(2);
    });
  });
});
