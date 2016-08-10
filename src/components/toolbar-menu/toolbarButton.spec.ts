import ToolbarButton from './toolbarButtonDirective';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarButton =  ToolbarButton.Factory();
    expect(toolbarButton).toBeDefined();
  });

  describe('directive', () => {
    let scope,
      compile,
      directiveElem;

    const toolbarButtonData = require<string>('./toolbarButton.json');

    beforeEach(()=>{
      angular.mock.module('miqStaticAssets');
      inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    it('creates button', () => {
      scope.toolbarButtonData = toolbarButtonData;
      let element = angular.element(`<miq-toolbar-button toolbar-button="toolbarButtonData" on-item-click="onItemClick(item, $event)"></miq-toolbar-button>`);
      var compiledElement = compile(element)(scope);
      scope.$digest();
      console.log(compiledElement);
    });
  });
});
