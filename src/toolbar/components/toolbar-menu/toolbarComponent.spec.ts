import Toolbar from './toolbarComponent';
import {ToolbarController} from './toolbarComponent';
import {ToolbarType} from '../../interfaces/toolbarType';
import {IToolbarItem} from '../../interfaces/toolbar';
import * as angular from 'angular';

describe('Toolbar test', () =>  {

  it('should instantiate',() => {
    let toolbar = new Toolbar;
    expect(toolbar).toBeDefined();
  });

  describe('controller', () => {
    let toolbarCtrl, sce;

    beforeEach(() => {
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($window, $location, $sce) => {
        sce = $sce;
        toolbarCtrl = new ToolbarController($window, $location, $sce);
      });
    });

    it('should return correct toolbar types', () => {
      expect(toolbarCtrl.getToolbarListType()).toBe(ToolbarType.BUTTON_SELECT);
      expect(toolbarCtrl.getButtonTwoState()).toBe(ToolbarType.BUTTON_TWO_STATE);
      expect(toolbarCtrl.getButtonType()).toBe(ToolbarType.BUTTON);
      expect(toolbarCtrl.getCustomType()).toBe(ToolbarType.CUSTOM);
    });

    it('should have no content', () => {
      const items: Array<IToolbarItem> = [{
        type: 'someBadType'
      }];

      expect(toolbarCtrl.hasContent(items)).toBe(false);
    });

    it('should have no content even with correct type', () => {
      let items: Array<IToolbarItem> = [{
        type: 'someBadType'
      }, {
        type: ToolbarType.BUTTON_SELECT
      }];
      expect(toolbarCtrl.hasContent(items)).toBe(false);
      items = [{
        type: 'someBadType'
      }, {
        type: ToolbarType.BUTTON_SELECT,
        items: []
      }];
      expect(toolbarCtrl.hasContent(items)).toBe(false);
    });

    it('should have content', () => {
      const items: Array<IToolbarItem> = [{
        type: 'someBadType'
      }, {
        type: ToolbarType.BUTTON_SELECT,
        items: [{
          type: ToolbarType.BUTTON
        }]
      }];
      expect(toolbarCtrl.hasContent(items)).toBe(true);
    });

    it('should trust as html', () => {
      let htmlContent = '&lt;div&gt;Some content&lt;/div&gt;';
      expect(sce.getTrustedHtml(toolbarCtrl.trustAsHtml(htmlContent))).toBe(ToolbarController.htmlDecode(htmlContent));
    });
  });

  describe('component', () => {
    let scope,
      compile,
      compiledElement;

    let toolbarData = require('../../../../demo/data/toolbar.json');

    beforeEach(() => {
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.toolbarData = toolbarData;
      compiledElement = compile(
        angular.element(
          `<miq-toolbar-menu toolbar-items="toolbarData"></miq-toolbar-menu>`
        ))(scope);
      scope.$digest();
    });

    it('creates toolbar', () => {
      const dropdownToggle: any = angular.element(
        compiledElement[0].querySelectorAll('button:not(.uib-dropdown-toggle)')
      );
      expect(dropdownToggle.length).toBe(2);
      expect(compiledElement.find('miq-toolbar-list').length).toBe(3);
    });
  });
});
