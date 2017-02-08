import * as _ from 'lodash';
import * as ng from 'angular';
/**
 * Controller for sort items component, it filters headers to fit config object of `pf-sort`.
 * @memberof miqStaticAssets.common
 * @ngdoc controller
 * @name SortItemsController
 */
export class SortItemsController {
  public headers: any;
  public options: any;
  public sortObject: any;
  public dropDownClass: any[];
  public onSort: (args: {sortObject: any, isAscending: boolean}) => void;

  /* @ngInject */
  constructor(private $element: any, private $timeout: any) {
    this.initOptions();
  }

  /**
   * Angular's method for checking one way data bounded properties changes.
   * @memberof SortItemsController
   * @function $onChanges
   * @param changesObj {Object} angular changes object.
   */
  public $onChanges(changesObj: any) {
    if (changesObj.headers) {
      this.fillFields();
      if (this.sortObject) {
        this.setSortItem();
      }
    }
    if (changesObj.dropDownClass) {
      this.applyClass();
    }
  }

  public $postLink() {
    //we have to wait for rendering of components, hence $timeout
    this.$timeout(() => this.applyClass());
  }

  /**
   * Public method for setting item which is currently sorted by. It will take id of object in `headers` as `colId`,
   * it's text as actual Id and same applies to `title`.
   * @memberof SortItemsController
   * @function setSortItem
   */
  public setSortItem() {
    if (this.sortObject && this.sortObject.sortObject && this.sortObject && this.sortObject.sortObject.text) {
      this.options.currentField = {
        colId: _.findIndex(this.headers, this.sortObject.sortObject),
        id: this.sortObject.sortObject.text.toLowerCase(),
        title: this.sortObject.sortObject.text
      };
      this.options.isAscending = this.sortObject.isAscending;
    }
  }

  /**
   * Public method which is called after constructing this controller. It will set default values for config object,
   * along side with sort method.
   * @memberof SortItemsController
   * @function initOptions
   */
  public initOptions() {
    this.options = {
      fields: [],
      onSortChange: (item: any, isAscending: boolean) => this.onSort({sortObject: item, isAscending: isAscending}),
      currentField: {}
    };
  }

  /**
   * Private method which will filter out and transform headers to config object. This function will filter out all
   * columns which has `is_narrow` and no `text` is set fot them. Also it will use each header key as `colId`,
   * text as `id` and again text as `title`.
   * @memberof SortItemsController
   * @function fillFields
   */
  private fillFields() {
    _.each(this.headers, (oneCol, key) => {
      if (!oneCol.hasOwnProperty('is_narrow') && oneCol.hasOwnProperty('text')) {
        this.options.fields.push({
          colId: key,
          id: oneCol.text.toLowerCase(),
          title: oneCol.text
        });
      }
    });
  }

  /**
   * Method for applying additional class for dropdown.
   * dropDownClass can be either string of classes, or array.
   */
  private applyClass() {
    if (this.dropDownClass) {
      Array.isArray(this.dropDownClass) ?
        this.$element.find('.dropdown').addClass(...this.dropDownClass) :
        this.$element.find('.dropdown').addClass(this.dropDownClass);
    }
  }
}
/**
 * @description
 *    Component for showing sort component. See {@link miqStaticAssets.common.SortItemsController} on how functions
 *    and properties are handled, This component requires `pf-sort` (see
 *    <a href="http://angular-patternfly.rhcloud.com/#/api/patternfly.sort.directive:pfSort">patternfly's
 *    implemetnation</a>) component to be part of application scope.
 *    If you do not provide such component no sort will be show. `pf-sort` requires `config` property which consists of:
 *    ```javascript
 *    config = {
 *      fields: [],
 *      onSortChange: (item: any, isAscending: boolean) => void,
 *      currentField: {}
 *    }
 *    ```
 * @memberof miqStaticAssets.common
 * @ngdoc component
 * @name miqSortItems
 * @attr {Expression} onSort function which is called after sorting has changed.
 * @attr {Object} headers items which will be present in sort chooser.
 * @attr {Object} sortObject object which is currently sorted by.
 * @example
 * <miq-sort-items on-sort="ctrl.onSort(sortObject, isAscending)"
 *                 headers="ctrl.headers"
 *                 sort-object="ctrl.currentSortObject">
 * </miq-sort-items>
 */
export default class SortItems implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = `<div pf-sort config="vm.options"></div>`;
  public controller = SortItemsController;
  public controllerAs = 'vm';
  public bindings: any = {
    onSort: '&',
    headers: '<',
    sortObject: '<',
    dropDownClass: '<'
  };
}
