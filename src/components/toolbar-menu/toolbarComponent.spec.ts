import ToolbarButton from './toolbarButtonDirective';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarButton =  ToolbarButton.Factory();
    expect(toolbarButton).toBeDefined();
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

    it('creates toolbar', () => {
      let compiledElement = compile(
          angular.element())(scope);
      scope.$digest();
    });
  });
});
