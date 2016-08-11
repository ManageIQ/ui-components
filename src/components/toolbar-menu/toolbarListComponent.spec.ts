import ToolbarList from './toolbarListComponent';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarList = new ToolbarList;
    expect(toolbarList).toBeDefined();
  });

  describe('component', () => {
    let scope,
      compile;

    beforeEach(() => {
      angular.mock.module('miqStaticAssets');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    it('creates toolbar list', () => {
      let compiledElement = compile(
          angular.element())(scope);
      scope.$digest();
    });
  });
});
