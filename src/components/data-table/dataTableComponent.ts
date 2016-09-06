import {ITableSettings, IDataTableBinding} from '../../interfaces/dataTable';

export class DataTableController implements IDataTableBinding{
  public perPage: any;
  public rows: any[];
  public columns: any[];
  public onSort: (args: {sortId: any, isAscending: boolean}) => void;
  public onItemSelected: (args: {item: any, isSelected: boolean}) => void;
  public onRowClick: (args: {item: any}) => void;
  public isAscending: boolean = true;
  public settings: ITableSettings;
  public currentPageView: number = 0;
  /*@ngInject*/
  constructor(private $transclude: any) {
    console.log(this);
  }

  public onSortClick(sortId, isAscending) {
    this.onSort({sortId: sortId, isAscending: this.isAscending});
  }

  public getColumnClass(column) {
    return {
      narrow: column.is_narrow
    };
  }

  public onCheckAll(isCheckec: boolean) {
    console.log(isCheckec);
  }

  public isHeaderEmpty(): boolean {
    return this.$transclude().length === 0;
  }

  public isIconOrImage(row, columnKey): boolean {
    return row && row.cells &&
      (row.cells[columnKey].hasOwnProperty('icon') || row.cells[columnKey].hasOwnProperty('image'));
  }

  public perPageClick(item) {
    console.log(item);
  }
  public $onChanges(changesObj: any) {
    if (changesObj.settings) {
      this.currentPageView = this.settings.current;
    }
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
    perPage: '<',
    settings: '<',
    loadMoreItems: '&',
    onSort: '&',
    onRowClick: '&',
    onItemSelected: '&'
  };
}
