import ToolbarList from './toolbarListComponent';
import * as angular from 'angular';

describe('ToolbarButton test', () =>  {

  it('should instantiate',() => {
    let toolbarList = new ToolbarList;
    expect(toolbarList).toBeDefined();
  });

  describe('component', () => {
    let scope,
      compile,
    compiledElement;

    const toolbarListData = require('./toolbarList.sample.json');

    beforeEach(() => {
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.toolbarList = toolbarListData;
      compiledElement = compile(
        angular.element(
          `<miq-toolbar-list toolbar-list="toolbarList"
                             on-item-click="onItemClick(item, $event)"></miq-toolbar-list>`
        ))(scope);
      scope.$digest();
    });

    it('creates toolbar list, which means button with dropdown-toggle/menu and ul list', () => {
      expect(compiledElement.find('button').hasClass('dropdown-toggle')).toBe(true);
      expect(compiledElement.find('ul').hasClass('dropdown-menu')).toBe(true);
      expect(compiledElement.find('ul').length).toBe(1);
    });

    it('toolbar list has two items', () => {
      const toolbarListItems = compiledElement.find('li');
      expect(toolbarListItems.length).toBe(2);
      angular.forEach(toolbarListItems, (listItem, key) => {
        let ngListItem = angular.element(listItem);
        let linkItem = ngListItem.find('a');
        let currItem = scope.toolbarList.items[key];
        expect(ngListItem.hasClass('disabled')).toBe(!currItem.enabled);
        expect(linkItem.html()).toContain(currItem.text);

      });
    });

    it('each list item should contain specific attributes', () => {
      angular.forEach(compiledElement.find('li'), (listItem, key) => {
        let linkItem = angular.element(listItem).find('a');
        let currItem = scope.toolbarList.items[key];
        expect(linkItem.attr('title')).toBe(currItem.title);
        expect(JSON.parse(linkItem.attr('data-explorer'))).toBe(currItem.explorer);
        expect(linkItem.attr('data-confirm-tb')).toBe(currItem.confirm);
        if (currItem.data) {
          expect(linkItem.attr('data-function')).toBe(currItem.data['function']);
          expect(linkItem.attr('data-function-data')).toBe(currItem.data['function-data']);
          expect(linkItem.attr('data-target')).toBe(currItem.data['target']);
          expect(linkItem.attr('data-toggle')).toBe(currItem.data['toggle']);
        }
        expect(linkItem.attr('data-click')).toBe(currItem.id);
        expect(linkItem.attr('data-url') ? linkItem.attr('data-url') : undefined).toBe(currItem.url);
        expect(linkItem.attr('data-url_parms')).toBe(currItem.url_parms);
        expect(linkItem.attr('name')).toBe(currItem.name);
        expect(linkItem.attr('id')).toBe(currItem.id);
      });
    });

    it('second item should have image instead of icon', () => {
      let itemWithImg = scope.toolbarList.items[1];
      let imgElem = compiledElement.find('li').find('img');
      expect(imgElem.length).toBe(1);
      expect(imgElem.attr('ng-src')).toBe(itemWithImg.img_url);
      expect(imgElem.attr('data-enabled')).toBe(itemWithImg.img_url);
      expect(imgElem.attr('src')).toBe(itemWithImg.img_url);
      expect(imgElem.attr('data-disabled')).toBe(itemWithImg.img_url);
    });
  });
});
