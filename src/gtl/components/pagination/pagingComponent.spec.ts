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

    it('should limit to total pages if bigger number of current is given', () => {
      pagingCtrl.settings.current = 10;
      pagingCtrl.onPageChange();
      expect(onChangePage).toHaveBeenCalledWith({ pageNumber: 2 });
    });

    it('should create limited number of pages', () => {
      pagingCtrl.settings.total = 10;
      pagingCtrl.settings.current = 9;
      pagingCtrl.onPageChange();
      expect(onChangePage).toHaveBeenCalledWith({ pageNumber: 9 });
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
      expect(pagination.querySelectorAll('li').length).toBe(scope.settings.total + 3);
      expect(pagination.querySelector('li.fa-angle-double-left')).toBeDefined();
      expect(pagination.querySelector('li.fa-angle-left')).toBeDefined();
      expect(pagination.querySelector('li.fa-angle-double-right')).toBeDefined();
      expect(pagination.querySelector('li.fa-angle-right')).toBeDefined();
    });
  });
});
