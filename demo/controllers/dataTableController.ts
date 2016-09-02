export default class DataTableController {
  public tableData;

  /* @ngInject */
  constructor(public MiQDataTableService: any, private MiQEndpointsService: any) {
    this.setEndpoints();
    this.fetchData().then(data => {
      console.log(this);
      this.tableData = data;
    });
  }

  private setEndpoints() {
    this.MiQEndpointsService.rootPoint = '/data';
    this.MiQEndpointsService.endpoints.listDataTable = '/data-table.json';
  }

  private fetchData() {
    return this.MiQDataTableService.retrieveRowsAndColumnsFromUrl();
  }
}
