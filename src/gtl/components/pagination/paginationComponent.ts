/**
 * Controller for pagination component
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name PaginationController
 */
export class PaginationController {
  public onSelectAll: (args: {isSelected: boolean}) => void;
  public onChangeSort: (args: {sortId: number, isAscending: boolean}) => void;
  public onChangePage: (args: {pageNumber: number}) => void;
  public onChangePerPage: (args: {item: number}) => void;
}

/**
 * @description
 *    Component TODO.
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqTileView
 * @attr {Object} settings
 *    TODO
 * @attr {Object} sortBy
 *    TODO
 * @attr {Object} perPage
 *    TODO
 * @attr {Expression} onSelectAll
 *    Function TODO.
 * @attr {Expression} onChangeSort
 *    Function TODO.
 * @attr {Expression} onChangePage
 *    Function TODO.
 * @attr {Expression} onChangePerPage
 *    Function TODO.
 * @example
 * <miq-pagination settings="settings"
 *                 per-page="perPage"
 *                 on-select-all="onCheckAll(isSelected)"
 *                 on-change-sort="onSortClick(sortId, isAscending)"
 *                 on-change-page="setPage(pageNumber)"
 *                 on-change-per-page="perPageClick(item)">
 * </miq-pagination>
 */
export default class Pagination implements ng.IComponentOptions {
  public replace = true;
  public controller = PaginationController;
  public template = require('./pagination.html');
  public controllerAs = 'paginationCtrl';
  public bindings: any = {
    settings: '<',
    perPage: '<',
    onSelectAll: '&',
    onChangeSort: '&',
    onChangePage: '&',
    onChangePerPage: '&'
  };
}
