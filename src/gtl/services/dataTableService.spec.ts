import DataTableSettingsService from './dataTableService';
import {IRowsColsResponse} from '../interfaces/dataTable';
import * as angular from 'angular';

describe('DataTableSettingsService test', () =>  {
  let dataTableSettings, scope, httpBackend;

  let modelName = 'modelName', tree = 'someTree', currId = 'currId';

  const dataTableData = require('../../../demo/data/data-table.json');
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
        {
          model: modelName,
          model_name: modelName,
          active_tree: tree,
          model_id: currId,
          parent_id: currId
        }
      )
    ).toBeTruthy();
  });

  it('should fetch data from server', (done) => {
    httpBackend.expectPOST(`/data/dataTable.json`, {
      active_tree: tree, model: modelName, model_name: modelName, model_id: currId, parent_id: currId
    })
      .respond(dataTableData);

    dataTableSettings.retrieveRowsAndColumnsFromUrl(modelName, tree, currId).then((responseData: IRowsColsResponse) => {
      expect(responseData.cols.length > 0).toBeTruthy();
      expect(responseData.rows.length > 0).toBeTruthy();
      expect(angular.equals(
        responseData.settings,
        {perpage: 20, current: 1, items: 6, total: 1}
      )).toBeTruthy();
      done();
    });
    httpBackend.flush();
    scope.$digest();
  });
});
