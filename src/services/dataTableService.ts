import {IDataTableService, IRowsColsResponse} from '../interfaces/dataTable';

/**
 *
 */
export default class DataTableService implements IDataTableService {
  private columns: any[];
  private rows: any[];
  /*@ngInject*/
  constructor(private $http: any, private MiQEndpointsService: any) {}

  /**
   *
   * @returns {any}
   */
  public retrieveRowsAndColumnsFromUrl(): ng.IPromise<IRowsColsResponse> {
    return this.$http.get(
      this.MiQEndpointsService.rootPoint + this.MiQEndpointsService.endpoints.listDataTable)
      .then(
        (responseData) => {
          this.columns = responseData.data.head;
          this.rows = responseData.data.rows;
          return {
            cols: this.columns,
            rows: this.rows
          };
        }
      );
  }
}
