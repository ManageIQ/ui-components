import * as _ from 'lodash';
import * as ng from 'angular';

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
  private MAX_PAGES = 6;

  /**
   * Public method for updating current paging, it will limit number of visible pages to `MAX_PAGES`.
   * @memberof PagingController
   * @function updatePages
   * @param total number of all item's pages.
   * @returns {any} array with page numbers which will be visible.
   */
  public updatePages(total) {
    if (total > this.MAX_PAGES) {
      let currentPage =
        (this.settings.current < (this.settings.total - this.MAX_PAGES + 1)) ?
          this.settings.current :
          (this.settings.total - this.MAX_PAGES + 1);
      this.pages = _.times(this.MAX_PAGES, item => (currentPage + item) - 1);
    } else {
      this.pages = new Array(total);
      _.each(this.pages, (item, key) => {
        this.pages[key] = key;
      });
    }
    return this.pages;
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
