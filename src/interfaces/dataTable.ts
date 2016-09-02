export interface IDataTableService {
  retrieveRowsAndColumnsFromUrl(): ng.IPromise<IRowsColsResponse>;
}

export interface IRowsColsResponse {
  rows: any[];
  cols: any[];
}

