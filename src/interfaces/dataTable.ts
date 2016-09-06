export interface IDataTableService {
  retrieveRowsAndColumnsFromUrl(): ng.IPromise<IRowsColsResponse>;
}

export interface IDataTableBinding {
  rows: any[];
  columns: any[];
  settings: ITableSettings;
  perPage: any;
  onSort: (args: {sortId: any, isAscending: boolean}) => void;
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
}

