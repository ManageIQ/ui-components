import ToolbarView from './toolbarViewComponent';
import * as angular from 'angular';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarView = new ToolbarView;
    expect(toolbarView).toBeDefined();
  });

  describe('component', () => {
    let scope,
      compile,
      compiledElement;

    const toolbarViewData = require('./toolbarView.sample.json');

    beforeEach(() => {
      angular.mock.module('miqStaticAssets.toolbar');
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
      const contentElement: any = angular.element(compiledElement.html());
      expect(contentElement.hasClass('toolbar-pf-view-selector')).toBe(true);
      expect(contentElement.hasClass('pull-right')).toBe(true);
      expect(contentElement.hasClass('form-group')).toBe(true);
    });

    it('should create 3 views', () => {
      const contentElement = angular.element(compiledElement.html());
      const button: any = contentElement.find('button');
      expect(button.length).toBe(3);
    });

    it('each view should have correct settings', () => {
      angular.forEach(compiledElement.find('button'), (element, key) => {
        let btnElem: any = angular.element(element);
        expect(btnElem.hasClass('active')).toBe(!!scope.toolbarViews[key].selected);
        expect(btnElem.attr('title')).toBe(scope.toolbarViews[key].title);
        expect(btnElem.attr('id')).toBe(scope.toolbarViews[key].id);
        expect(btnElem.attr('data-url')).toBe(scope.toolbarViews[key].url);
        expect(btnElem.attr('data-url_parms')).toBe(scope.toolbarViews[key].url_parms);
        expect(btnElem.attr('name')).toBe(scope.toolbarViews[key].name);
      });
    });
  });
});
