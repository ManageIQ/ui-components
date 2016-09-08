import {IDataTableBinding} from '../../interfaces/dataTable';
import {DataViewClass} from '../../interfaces/abstractDataViewClass';

export class DataTableController extends DataViewClass implements IDataTableBinding {
  /*@ngInject*/
  constructor(private $transclude: any) {
    super();
  }

  public getColumnClass(column) {
    return {
      narrow: column.is_narrow
    };
  }

  public isHeaderEmpty(): boolean {
    return this.$transclude().length === 0;
  }

  public isIconOrImage(row, columnKey): boolean {
    return row && row.cells &&
      (row.cells[columnKey].hasOwnProperty('icon') || row.cells[columnKey].hasOwnProperty('image'));
  }

  public isFilteredBy(column: any) {
    return !!this.settings.sortBy && (this.settings.sortBy.sortObject.col_idx === column.col_idx);
  }

  public getSortClass(colum) {
    return {
      'fa-sort-asc': !!this.settings.sortBy && this.settings.sortBy.isAscending,
      'fa-sort-desc': !(!!this.settings.sortBy && this.settings.sortBy.isAscending)
    };
  }

  public $onChanges(changesObj: any) {
    if (changesObj.settings && this.settings) {
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
