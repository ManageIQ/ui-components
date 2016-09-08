export default class DataTableController {
  public tableData;
  public perPage;
  public filteredRows: any;
  /* @ngInject */
  constructor(public MiQDataTableService: any, private MiQEndpointsService: any, private $filter: any) {
    this.perPage = {
      label: 'Items per page',
      enabled: true,
      text: 20,
      value: 20,
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
      this.onSort(2, true);
    });
  }

  public onLoadNext(start, perPage) {
    this.perPage.value = perPage;
    this.perPage.text = perPage;
    this.tableData.settings.perpage = perPage;
    this.tableData.settings.startIndex = start;
    this.tableData.settings.current = ( start / perPage) + 1;
    this.tableData.settings.total = Math.ceil(this.tableData.settings.items / this.tableData.settings.perpage);
    this.filterAndSort();
  }

  public onSort(headerId, isAscending) {
    this.tableData.settings.sortBy = {
      sortObject: this.tableData.cols[headerId],
      isAscending: isAscending
    };
    this.filterAndSort();
  }

  public filterAndSort() {
    this.filteredRows = this.tableData.rows;
    if (this.tableData.settings.sortBy) {
      this.sortItems();
    }
    this.limitTo();
  }

  public sortItems() {
    this.filteredRows = _.sortBy(this.filteredRows, (row: any) => {
      let indexOfColumn = this.tableData.cols.indexOf(this.tableData.settings.sortBy.sortObject);
      return row.cells[indexOfColumn]['text'];
    });
    this.filteredRows = this.tableData.settings.sortBy.isAscending ? this.filteredRows : this.filteredRows.reverse();
    return this.filteredRows;
  }

  public limitTo() {
    this.filteredRows = this.$filter('limitTo')(
      this.filteredRows,
      this.tableData.settings.perpage,
      this.tableData.settings.startIndex
    );
    return this.filteredRows;
  }

  public onRowClick(item) {
    console.log('It was clicked on item:', item);
  }

  public onItemSelect(item, isSelected) {
    console.log('Item which was selected and was selected?', item, isSelected);
  }

  private setEndpoints() {
    this.MiQEndpointsService.rootPoint = '/data';
    this.MiQEndpointsService.endpoints.listDataTable = '/data-table.json';
  }

  private fetchData() {
    return this.MiQDataTableService.retrieveRowsAndColumnsFromUrl();
  }
}
