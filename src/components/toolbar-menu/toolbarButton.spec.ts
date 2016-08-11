import ToolbarButton from './toolbarButtonDirective';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarButton =  ToolbarButton.Factory();
    expect(toolbarButton).toBeDefined();
  });

  describe('directive', () => {
    let scope,
      compile;

    const toolbarButtonData = require<string>('./toolbarButton.json');

    beforeEach(() => {
      angular.mock.module('miqStaticAssets');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    it('creates button', () => {
      scope.toolbarButtonData = toolbarButtonData;
      let compiledElement = compile(
          angular.element(
            `<miq-toolbar-button toolbar-button="toolbarButtonData"
                                 on-item-click="onItemClick(item, $event)"></miq-toolbar-button>`
          ))(scope);
      scope.$digest();
      expect(compiledElement.attr('name')).toBe(scope.toolbarButtonData.name);
      expect(compiledElement.attr('data-click')).toBe(scope.toolbarButtonData.name);
      expect(compiledElement.attr('data-url_parms')).toBe(scope.toolbarButtonData.url_parms);
    });
  });
});
