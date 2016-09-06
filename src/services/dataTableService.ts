import {IDataTableService, IRowsColsResponse} from '../interfaces/dataTable';

/**
 *
 */
export default class DataTableService implements IDataTableService {
  private columns: any[];
  private rows: any[];
  private settings: any;
  /*@ngInject*/
  constructor(private $http: any, private MiQEndpointsService: any) {}

  /**
   *
   * @returns {any}
   */
  public retrieveRowsAndColumnsFromUrl(
    modelName?: string,
    activeTree?: string,
    currId?: string):
  ng.IPromise<IRowsColsResponse> {
    let config = {params: {}};
    _.assign(config.params, DataTableService.generateModelConfig(modelName));
    _.assign(config.params, DataTableService.generateActiveTreeConfig(activeTree));
    _.assign(config.params, DataTableService.generateModuleIdConfig(currId));
    return this.$http.get(
        this.MiQEndpointsService.rootPoint + this.MiQEndpointsService.endpoints.listDataTable,
        config
      ).then(
        (responseData) => {
          this.columns = responseData.data.data.head;
          this.rows = responseData.data.data.rows;
          this.settings = responseData.data.settings;
          return {
            cols: this.columns,
            rows: this.rows,
            settings: responseData.data.settings
          };
        }
      );
  }

  private static generateModelConfig(modelName): any {
    return modelName && {model: modelName};
  }

  private static generateActiveTreeConfig(activeTree): any {
    return activeTree && {active_tree: activeTree};
  }

  private static generateModuleIdConfig(currId): any {
    return currId && {model_id: currId};
  }
}
