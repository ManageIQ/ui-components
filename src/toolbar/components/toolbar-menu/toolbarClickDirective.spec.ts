import * as angular from 'angular';

describe('Action click test', () =>  {
  const onItemClick = jasmine.createSpy('onItemClick', (item, $event) => undefined);
  const item = {
    title: 'title',
    text: 'someText',
    hidden: false,
    explorer: false,
    confirm: 'confirm-text',
    data: {
      'function': 'someJsFunction',
      'function-data': 'dataToPass',
      target: 'targetData',
      toggle: 'toggleData',
    },
    id: 'someId',
    url_parms: 'urlParms',
    'send_checked': true,
    prompt: 'promptData',
    popup: 'popupData',
    url: 'urlString',
    icon: 'fa',
    img_url: 'someUrl'
  };

  describe('markup', () => {
    let scope, compile, compiledElement;
    beforeEach(() => {
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.item = item;
      scope.onItemClick = onItemClick;
      compiledElement = compile(
        angular.element(
          `<miq-toolbar-click
            item="item"
            on-item-click="onItemClick({item: item, $event: $event})">
           </miq-toolbar-click>`
        ))(scope);
      scope.$digest();
    });

    it('should render all data', () => {
      expect(compiledElement.attr('title')).toBe('title');
      expect(compiledElement.attr('data-explorer')).toBe('false');
      expect(compiledElement.attr('data-confirm-tb')).toBe('confirm-text');
      expect(compiledElement.attr('data-function')).toBe('someJsFunction');
      expect(compiledElement.attr('data-function-data')).toBe('dataToPass');
      expect(compiledElement.attr('data-target')).toBe('targetData');
      expect(compiledElement.attr('data-toggle')).toBe('toggleData');
      expect(compiledElement.attr('data-click')).toBe('someId');
      expect(compiledElement.attr('name')).toBe('someId');
      expect(compiledElement.attr('id')).toBe('someId');
      expect(compiledElement.attr('data-url_parms')).toBe('urlParms');
      expect(compiledElement.attr('data-send_checked')).toBe('true');
      expect(compiledElement.attr('data-prompt')).toBe('promptData');
      expect(compiledElement.attr('data-popup')).toBe('popupData');
      expect(compiledElement.attr('data-url')).toBe('urlString');
    });

    it('should render icon', () => {
      expect(compiledElement.find('i').length).toBe(1);
      expect(compiledElement.find('img').length).toBe(0);
      expect(compiledElement.find('i').attr('style')).toBe('margin-right: 5px;');
      console.log();
    });

    it('should render aligned icon', () => {
      scope.item.text = '';
      scope.$apply();
      expect(compiledElement.find('i').attr('style')).toBe(undefined);
    });

    it('should render image', () => {
      scope.item.icon = '';
      scope.$apply();
      expect(compiledElement.find('img').length).toBe(1);
      expect(compiledElement.find('i').length).toBe(0);
    });

    it('should not render image or icon', () => {
      scope.item.icon = '';
      scope.item.img_url = '';
      scope.$apply();
      expect(compiledElement.find('img').length).toBe(0);
      expect(compiledElement.find('i').length).toBe(0);
    });

    it('should call onItemClick with arguments', () => {
      compiledElement[0].click();
      expect(onItemClick).toHaveBeenCalled();
    });
  });
});
