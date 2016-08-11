import ToolbarView from './toolbarViewComponent';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarView = new ToolbarView;
    expect(toolbarView).toBeDefined();
  });

  describe('directive', () => {
    let scope,
      compile;

    beforeEach(() => {
      angular.mock.module('miqStaticAssets');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    it('creates toolbar view', () => {
      let compiledElement = compile()(scope);
      scope.$digest();
    });
  });
});
