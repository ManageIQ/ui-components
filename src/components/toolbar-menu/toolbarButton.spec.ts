import ToolbarButton from './toolbarButtonDirective';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarButton =  ToolbarButton.Factory();
    expect(toolbarButton).toBeDefined();
  });

  describe('directive', () => {
    let scope,
      compile,
      compiledElement;

    const toolbarButtonData = require<string>('./toolbarButton.sample.json');

    beforeEach(() => {
      angular.mock.module('miqStaticAssets');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.toolbarButtonData = toolbarButtonData;
      compiledElement = compile(
        angular.element(
          `<miq-toolbar-button toolbar-button="toolbarButtonData"
                                 on-item-click="onItemClick(item, $event)"></miq-toolbar-button>`
        ))(scope);
      scope.$digest();
    });

    it('creates button and checks for {name, confirm-tb, explorer, title, url, click, url_parms}', () => {
      expect(compiledElement.attr('name')).toBe(scope.toolbarButtonData.name);
      expect(compiledElement.attr('data-confirm-tb')).toBe(scope.toolbarButtonData.confirm);
      expect(JSON.parse(compiledElement.attr('data-explorer'))).toBe(scope.toolbarButtonData.explorer);
      expect(compiledElement.attr('title')).toBe(scope.toolbarButtonData.title);
      expect(compiledElement.attr('data-url')).toBe(scope.toolbarButtonData.url);
      expect(compiledElement.attr('data-click')).toBe(scope.toolbarButtonData.name);
      expect(compiledElement.attr('data-url_parms')).toBe(scope.toolbarButtonData.url_parms);
    });

    it('toolbar button should contain text', () => {
      expect(compiledElement.html()).toContain(scope.toolbarButtonData.text);
    });

    it('create button with img instead of icon', () => {
      scope.toolbarButtonData.icon = null;
      scope.$digest();
      expect(compiledElement.html()).toContain(`ng-src="${scope.toolbarButtonData.img_url}"`);
    });
  });
});
