import ToolbarView from './toolbarViewComponent';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarView = new ToolbarView;
    expect(toolbarView).toBeDefined();
  });

  describe('component', () => {
    let scope,
      compile,
      compiledElement;

    const toolbarViewData = require<string>('./toolbarView.json');

    beforeEach(() => {
      angular.mock.module('miqStaticAssets');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
      scope.toolbarViews = toolbarViewData;
      compiledElement = compile(
        angular.element(
          `<miq-toolbar-view toolbar-views="toolbarViews"
                             on-item-click="onViewClick({item: item, $event: $event})"
                             class="miq-view-list"></miq-toolbar-view>`
        ))(scope);
      scope.$digest();
    });

    it('should create toolbar view', () => {
      const contentElement = angular.element(compiledElement.html());
      expect(contentElement.hasClass('toolbar-pf-view-selector')).toBe(true);
      expect(contentElement.hasClass('pull-right')).toBe(true);
      expect(contentElement.hasClass('form-group')).toBe(true);
    });

    it('should create 3 views', () => {
      const contentElement = angular.element(compiledElement.html());
      expect(contentElement.find('li').length).toBe(3);
    });

    it('each view should have correct settings', () => {
      angular.forEach(compiledElement.find('li'), (element, key) => {
        let liElem = angular.element(element);
        let linkElem = angular.element(liElem.html());
        expect(liElem.hasClass('active')).toBe(!!scope.toolbarViews[key].selected);
        expect(linkElem.attr('title')).toBe(scope.toolbarViews[key].title);
        expect(linkElem.attr('id')).toBe(scope.toolbarViews[key].id);
        expect(linkElem.attr('data-url')).toBe(scope.toolbarViews[key].url);
        expect(linkElem.attr('data-url_parms')).toBe(scope.toolbarViews[key].url_parms);
        expect(linkElem.attr('name')).toBe(scope.toolbarViews[key].name);
      });
    });
  });
});
