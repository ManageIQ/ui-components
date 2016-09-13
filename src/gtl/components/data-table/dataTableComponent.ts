import {IDataTableBinding} from '../../interfaces/dataTable';
import {DataViewClass} from '../../interfaces/abstractDataViewClass';

/**
 * This controller is for managing data table entities. It extends {@link miqStaticAssets.gtl.DataViewClass}
 * which is abstract class with basic methods for filtering, sorting and limiting entries in data table.
 * @extends miqStaticAssets.gtl.DataViewClass
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name DataTableController
 */
export class DataTableController extends DataViewClass implements IDataTableBinding {
  /**
   * Public method for getting column class, narrow column with checkbox or image.
   * @memberof DataTableController
   * @function getColumnClass
   * @param column {Object} header column. This column will have `is_narrow` property set to true and `narrow` class
   * will be present in classes.
   * @returns {Object} angular class object. `{narrow: boolean}`
   */
  public getColumnClass(column: any) {
    return {
      narrow: column.is_narrow
    };
  }

  /**
   * Public method for checking if column of table is icon or image.
   * @memberof DataTableController
   * @function isIconOrImage
   * @param row {object} whole row with data.
   * @param columnKey header column key.
   * @returns {boolean} true | false, if column is image or icon.
   */
  public isIconOrImage(row, columnKey): boolean {
    return row && row.cells &&
      (row.cells[columnKey].hasOwnProperty('icon') || row.cells[columnKey].hasOwnProperty('image'));
  }

  /**
   * Public method for finding out if it's filtered by header column.
   * @memberof DataTableController
   * @function isFilteredBy
   * @param column column which is checked if it's filtered by.
   * @returns {boolean} true | false if `this.settings.sortBy.sortObject.col_idx` is equal to `column.col_idx`.
   */
  public isFilteredBy(column: any) {
    return !!this.settings.sortBy && (this.settings.sortBy.sortObject.col_idx === column.col_idx);
  }

  /**
   * Public method for getting sort class, either `fa-sort-asc` or `fa-sort-desc`.
   * @memberof DataTableController
   * @function getSortClass
   * @returns {Object} angular class object: `{fa-sort-asc: boolean, fa-sort-desc: boolean}`
   */
  public getSortClass() {
    return {
      'fa-sort-asc': !!this.settings.sortBy && this.settings.sortBy.isAscending,
      'fa-sort-desc': !(!!this.settings.sortBy && this.settings.sortBy.isAscending)
    };
  }

  /**
   * Angular's $onchange function to find out if one of bounded option has changed.
   * @memberof DataTableController
   * @function $onChanges
   * @param changesObj angular changed object.
   */
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
