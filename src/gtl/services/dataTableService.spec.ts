import DataTableSettingsService from './dataTableService';
import {IRowsColsResponse} from '../interfaces/dataTable';

describe('DataTableSettingsService test', () =>  {
  let dataTableSettings, scope, httpBackend;

  let modelName = 'modelName', tree = 'someTree', currId = 'currId';

  const dataTableData = require<string>('../../../demo/data/data-table.json');
  beforeEach(() => {
    angular.mock.module('miqStaticAssets.gtl');
    angular.mock.module('miqStaticAssets.common');
    angular.mock.inject(($http, MiQEndpointsService, $rootScope, $httpBackend) => {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      MiQEndpointsService.rootPoint = '/data';
      MiQEndpointsService.endpoints.listDataTable = '/dataTable.json';
      dataTableSettings = new DataTableSettingsService($http, MiQEndpointsService);
    });
  });

  it('should create service', () => {
    expect(dataTableSettings).toBeDefined();
  });

  it('should generate full config', () => {
    expect(
      angular.equals(
        DataTableSettingsService.generateConfig(modelName, tree, currId),
        { params: {
            model: modelName,
            active_tree: tree,
            model_id: currId
        }}
      )
    ).toBeTruthy();
  });

  it('should fetch data from server', (done) => {
    httpBackend.expectGET(`/data/dataTable.json?active_tree=${tree}&model=${modelName}&model_id=${currId}`)
      .respond(dataTableData);
    dataTableSettings.retrieveRowsAndColumnsFromUrl(modelName, tree, currId).then((responseData: IRowsColsResponse) => {
      expect(responseData.cols.length > 0).toBeTruthy();
      expect(responseData.rows.length > 0).toBeTruthy();
      expect(angular.equals(
        responseData.settings,
        {perpage: 20, current: 1, items: 17, total: 1}
      )).toBeTruthy();
      done();
    });
    httpBackend.flush();
    scope.$digest();
  });
});
