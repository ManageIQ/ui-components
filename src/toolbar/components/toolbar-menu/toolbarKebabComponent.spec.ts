import * as angular from 'angular';

describe('Kebab test', () =>  {
  const item = {
    items: [{
      type: 'button',
      text: 'Something'
    }, {
      type: 'buttonSelect',
      text: 'Something select',
      items: [{
        type: 'button',
        text: 'Something 2'
      }, {
        type: 'button',
        text: 'Something 3'
      }]
    }],
  };

  describe('controller', () => {
    let toolbarKebabController, bindings, onItemClick;

    beforeEach(() => {
      onItemClick = jasmine.createSpy('onItemClick', (item, $scope) => undefined);
      bindings = {
        kebabItem: item,
        onItemClick: onItemClick
      };
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($componentController) => {
        toolbarKebabController = $componentController('miqToolbarKebab', null, bindings);
      });
    });

    it('should create correctly controller', () => {
      expect(toolbarKebabController).toBeDefined();
    });

    it('should set component\'s items', () => {
      expect(angular.equals(toolbarKebabController.kebabItem, item)).toBeTruthy();
      expect(angular.equals(toolbarKebabController.onItemClick, onItemClick)).toBeTruthy();
    });
  });

  describe('markup', () => {
    let scope, compile, compiledElement, onItemClick;
    beforeEach(() => {
      onItemClick = jasmine.createSpy('onItemClick', (item, $scope) => undefined);
      angular.mock.module('miqStaticAssets.toolbar');
      angular.mock.inject(($rootScope, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });

      scope.kebabItem = item;
      scope.onItemClick = onItemClick;
      compiledElement = compile(
        angular.element(
          `<miq-toolbar-kebab
            kebab-item="kebabItem"
            on-item-click="onItemClick({item: item, $event: $event})">
           </miq-toolbar-kebab>`
        ))(scope);
      scope.$digest();
    });

    describe('kebab menu', () => {
      it('should render dropdown menu', () => {
        expect(compiledElement.find('button[uib-dropdown-toggle=""]').length).toBe(1);
        expect(compiledElement.find('ul')).toBeDefined();
      });

      it('should render button and button select', () => {
        expect(compiledElement.find('.dropdown-submenu').length).toBe(1);
        expect(compiledElement.find('.dropdown-submenu ul').length).toBe(1);
        expect(compiledElement.find('.dropdown-submenu ul li').length).toBe(2);
      });
    });

    it('should call on click', () => {
      compiledElement.find('li>a')[0].click();
      expect(onItemClick).toHaveBeenCalled();
    });

    it('should not call buttonSelect', () => {
      compiledElement.find('li.dropdown-submenu>a')[0].click();
      expect(onItemClick).not.toHaveBeenCalled();
    });
  });
});
