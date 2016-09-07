export interface IDataTableService {
  retrieveRowsAndColumnsFromUrl(): ng.IPromise<IRowsColsResponse>;
}

export interface IDataTableBinding {
  rows: any[];
  columns: any[];
  settings: ITableSettings;
  perPage: any;
  loadMoreItems: (args: {start: number, perPage: number}) => void;
  onSort: (args: {headerId: any, isAscending: boolean}) => void;
  onItemSelected: (args: {item: any, isSelected: boolean}) => void;
  onRowClick: (args: {item: any}) => void;
}

export interface IRowsColsResponse {
  rows: any[];
  cols: any[];
  settings: ITableSettings;
}

export interface ITableSettings {
  current: number;
  items: number;
  perpage: string;
  total: number;
  sortBy: ITableSortBy;
  paging: ITablePaging;
}

export interface ITableSortBy {
  isAscending: boolean;
  sortObject: any;
}

export interface ITablePaging {
  end: number;
  start: number;
}
