export class DataTableController {
  public rows: any[];
  public columns: any[];
  public onSort: (args: {item: any, isAscending: boolean}) => void;
  public isAscending: boolean = true;
  /*@ngInject*/
  constructor(private $transclude: any){}

  public onSortClick(colum) {
    this.onSort({item: colum, isAscending: this.isAscending});
  }

  public getColumnClass(column) {
    return {
      narrow: column.is_narrow
    }
  }

  public onCheckAll(isCheckec: boolean) {
    console.log(isCheckec);
  }

  public isHeaderEmpty(): boolean {
    return this.$transclude().length === 0;
  }

  public isIconOrImage(row, columnKey): boolean {
    return row && row.cells && (row.cells[columnKey].hasOwnProperty('icon') || row.cells[columnKey].hasOwnProperty('image'));
  }
}

export default class DataTable {
  public replace: boolean = true;
  public template = require<string>('./data-table.html');
  public controller: any = DataTableController;
  public transclude: boolean = true;
  public controllerAs: string = 'tableCtrl';
  public bindings: any = {
    rows: '<',
    columns: '<',
    loadMoreItems: '&',
    onSort: '&',
    onRowClick: '&',
    onItemSelected: '&'
  };
}
