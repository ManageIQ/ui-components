import {ITableSettings, IDataTableBinding} from '../../interfaces/dataTable';

export class DataTableController implements IDataTableBinding{
  public perPage: any;
  public rows: any[];
  public columns: any[];
  public onSort: (args: {headerId: any, isAscending: boolean}) => void;
  public onItemSelected: (args: {item: any, isSelected: boolean}) => void;
  public loadMoreItems: (args: {start: number; perPage: number}) => void;
  public onRowClick: (args: {item: any}) => void;
  public settings: ITableSettings;
  public currentPageView: number = 0;
  /*@ngInject*/
  constructor(private $transclude: any) {}

  public onSortClick(sortId, isAscending) {
    this.onSort({headerId: sortId, isAscending: isAscending});
  }

  public getColumnClass(column) {
    return {
      narrow: column.is_narrow
    };
  }

  public onCheckAll(isCheckec: boolean) {
    _.each(this.rows, oneRow => {
      this.onItemSelected({item: oneRow, isSelected: isCheckec});
    });
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

  public perPageClick(item) {
    console.log(item);
  }

  public setPage(pageNumber) {
    if (pageNumber > this.settings.total)
    {
      this.currentPageView = this.settings.total;
      pageNumber = this.currentPageView;
    }
    const start = DataTableController.calculateStartIndex(pageNumber, this.settings.perpage);
    this.loadMoreItems({start: start, perPage: 0});
  }

  public $onChanges(changesObj: any) {
    if (changesObj.settings && this.settings) {
      this.currentPageView = this.settings.current;
    }
  }

  private static calculateStartIndex(pageNumber, perPage) {
    return (pageNumber - 1) * perPage;
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
