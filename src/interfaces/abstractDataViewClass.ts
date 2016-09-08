import {IDataTableBinding, ITableSettings} from './dataTable';
export abstract class DataViewClass implements IDataTableBinding {
  public perPage: any;
  public rows: any[];
  public columns: any[];
  public onSort: (args: {headerId: any, isAscending: boolean}) => void;
  public onItemSelected: (args: {item: any, isSelected: boolean}) => void;
  public loadMoreItems: (args: {start: number; perPage: number}) => void;
  public onRowClick: (args: {item: any}) => void;
  public settings: ITableSettings;
  public currentPageView: number = 1;

  public onCheckAll(isCheckec: boolean) {
    _.each(this.rows, oneRow => {
      this.onItemSelected({item: oneRow, isSelected: isCheckec});
    });
  }

  public onSortClick(sortId, isAscending) {
    this.onSort({headerId: sortId, isAscending: isAscending});
  }

  public perPageClick(item) {
    const maxPage = Math.ceil(this.settings.items / item.value);
    this.currentPageView = this.currentPageView > maxPage ? maxPage : this.currentPageView;
    const start = DataViewClass.calculateStartIndex(this.currentPageView, item.value);
    this.loadMoreItems({start: start, perPage: item.value});
  }

  public setPage(pageNumber) {
    console.log(pageNumber);
    if (pageNumber > this.settings.total) {
      this.currentPageView = this.settings.total;
      pageNumber = this.currentPageView;
    }
    this.currentPageView = pageNumber;
    const start = DataViewClass.calculateStartIndex(pageNumber, this.settings.perpage);
    this.loadMoreItems({start: start, perPage: this.settings.perpage});
  }

  protected static calculateStartIndex(pageNumber, perPage) {
    return (pageNumber - 1) * perPage;
  }
}
