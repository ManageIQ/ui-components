export default class DataTableController {
  public tableData;
  public perPage;

  /* @ngInject */
  constructor(public MiQDataTableService: any, private MiQEndpointsService: any) {
    this.perPage = {
      label: 'Items per page',
      enabled: true,
      text: 10,
      value: 10,
      hidden: false,
      items: [
        {text: 5, value: 5, hidden: false, enabled: true},
        {text: 10, value: 10, hidden: false, enabled: true},
        {text: 20, value: 20, hidden: false, enabled: true},
        {text: 50, value: 50, hidden: false, enabled: true},
        {text: 100, value: 100, hidden: false, enabled: true},
        {text: 1000, value: 1000, hidden: false, enabled: true},
        {text: 'All', value: -1, hidden: false, enabled: true},
      ]
    };
    this.setEndpoints();
    this.fetchData().then(data => {
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
