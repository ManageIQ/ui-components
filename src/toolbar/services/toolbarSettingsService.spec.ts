import ToolbarSettings from './toolbarSettingsService';

describe('EndpointsService test', () =>  {
  let toolbarSettings, scope, httpBackend;

  const toolbarData = require<string>('../../../demo/data/toolbar.json');
  beforeEach(() => {
    angular.mock.module('miqStaticAssets');
    angular.mock.inject(($http, MiQEndpointsService, $rootScope, $httpBackend) => {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      MiQEndpointsService.rootPoint = '/data';
      MiQEndpointsService.endpoints.toolbarSettings = '/toolbar.json';
      toolbarSettings = new ToolbarSettings($http, MiQEndpointsService);
    });
  });

  it('should create service', () => {
    expect(toolbarSettings).toBeDefined();
  });

  it('should generate object', () => {
    let responseData = toolbarSettings.generateToolbarObject(toolbarData);
    expect(responseData.items.length).toBe(3);
    expect(responseData.dataViews.length).toBe(3);
  });

  it('should enable item after click', () => {
    let responseData = toolbarSettings.generateToolbarObject(toolbarData);
    let toolbarKey = 0, itemToolbarKey = 0;
    responseData.items[0].forEach((toolbarItem, key) => {
      if (toolbarItem.items) {
        toolbarItem.items.forEach((oneItem, itemKey) => {
          toolbarKey = key;
          itemToolbarKey = itemKey;
        });
      }
    });
    expect(responseData.items[0][toolbarKey].items[itemToolbarKey].enabled).toBe(false);
    toolbarSettings.checkboxClicked(true);
    expect(responseData.items[0][toolbarKey].items[itemToolbarKey].enabled).toBe(true);
  });

  it('should get object from url', (done) => {
    httpBackend.expectGET('/data/toolbar.json').respond(toolbarData);
    toolbarSettings.getSettings().then(responseData => {
      expect(responseData.items.length).toBe(3);
      expect(responseData.dataViews.length).toBe(3);
      done();
    });
    httpBackend.flush();
    scope.$digest();
  });
});
