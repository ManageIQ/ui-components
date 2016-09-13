import EndpointsService from './endpointsService';

describe('EndpointsService test', () =>  {
  it('should create service', () => {
    let endpointsService = new EndpointsService;
    expect(endpointsService).toBeDefined();
  });

  it('should have default values', () => {
    let endpointsService = new EndpointsService;
    expect(endpointsService.rootPoint).toBe('');
    expect(endpointsService.endpoints.listDataTable).toBe('/list');
    expect(endpointsService.endpoints.deleteItemDataTable).toBe('/delete');
    expect(endpointsService.endpoints.validateItem).toBe('/validate');
    expect(endpointsService.endpoints.createItem).toBe('/create');
    expect(endpointsService.endpoints.providerSettings).toBe('/list_providers_settings');
    expect(endpointsService.endpoints.toolbarSettings).toBe('/toolbar');
  });
});
