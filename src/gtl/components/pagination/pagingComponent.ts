import * as _ from 'lodash';

/**
 * Controller for paging component
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name PagingController
 */
export class PagingController {
  public settings: any;
  public pages: any;
  public onChangePage: (args: {pageNumber: any}) => void;

  public onPageChange() {
    this.settings.current = this.settings.current > this.settings.total ? this.settings.total : this.settings.current;
    this.onChangePage({pageNumber: this.settings.current});
  }
}

/**
 * @description
 *    Component for show paging for some long list (e.g. these are used in tile lists).
 *    Settings object example:
 *    ```javascript
 *    {
 *      current: 1,
 *      total: 5
 *    }
 *    ```
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqPaging
 * @attr {Object} settings
 *    settings for paging component. It has `current` attribute `Number` and total `Number`
 *
 * @attr {Expression} onChangePage
 *    object which is currently sorted by.
 * @example
 * <miq-paging settings="settings"
 *             on-change-page="setPage(pageNumber)">
 * </miq-paging>
 */
export default class Paging implements ng.IComponentOptions {
  public replace = true;
  public controller = PagingController;
  public template = require('./paging.html');
  public controllerAs = 'pagingCtrl';
  public bindings: any = {
    settings: '<',
    onChangePage: '&'
  };
}
