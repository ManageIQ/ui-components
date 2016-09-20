import {TileType} from '../../interfaces/tileType';
import {IDataTableBinding} from '../../interfaces/dataTable';
import {DataViewClass} from '../../interfaces/abstractDataViewClass';

/**
 * Controller for tile components. It will extend {@link miqStaticAssets.gtl.DataViewClass}.
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name TileViewController
 */
export class TileViewController extends DataViewClass implements IDataTableBinding {
  public type: string;
  public options: any;
  /* @ngInject */
  constructor(private $sce: any) {
    super();
    this.initOptions();
  }

  /**
   * @memberof TileViewController
   * @function initOptions
   */
  private initOptions(): void {
    this.options = {
      selectionMatchProp: 'id',
      selectItems: true,
      multiSelect: true,
      showSelectBox: false,
      onClick: (item, event) => this.onTileClick(item),
      onItemClick: (item) => this.onRowClick({item: item}),
      fetchTileName: (item) => this.fetchTileName(item),
      trustAsHtmlQuadicon: (item) => this.trustAsHtmlQuadicon(item),
      type: this.type
    };
  }

  /**
   *
   * @memberof TileViewController
   * @function trustAsHtmlQuadicon
   * @param item
   * @returns {any}
   */
  public trustAsHtmlQuadicon(item) {
    return this.$sce.trustAsHtml(item.quadicon);
  }

  /**
   *
   * @memberof TileViewController
   * @function fetchTileName
   * @param item
   * @returns {string}
   */
  public fetchTileName(item): string {
    const nameIndex = _.findIndex(this.columns, oneColumn => oneColumn.text && oneColumn.text.indexOf('Name') !== -1);
    return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ? item.cells[nameIndex]['text'] : '';
  }

  /**
   *
   * @memberof TileViewController
   * @function $onChanges
   * @param changesObj
   */
  public $onChanges(changesObj: any) {
    if (changesObj.type) {
      this.options.type = this.type;
    } else if (changesObj.columns) {
      this.options.columns = this.columns;
    }
  }

  /**
   *
   * @memberof TileViewController
   * @function onTileClick
   * @param item
   */
  public onTileClick(item) {
    this.onItemSelected({item: item, isSelected: item === _.find(this.options.selectedItems, {id: item.id})});
  }

  /**
   *
   * @memberof TileViewController
   * @function tileClass
   * @returns {Object} {miq-small-tile: boolean, miq-tile-with-body: boolean}
   */
  public tileClass() {
    return {
      'miq-small-tile': this.type === TileType.SMALL,
      'miq-tile-with-body': this.type === TileType.BIG
    };
  }
}

/**
 * @description
 *    Component for show tile list.
 *    Settings object example:
 *    ```javascript
 *    {
 *      current: 1,
 *      total: 5
 *    }
 *    ```
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqTileView
 * @attr {Object} type
 *    TODO
 * @attr {Object} rows
 *    TODO
 * @attr {Object} perPage
 *    TODO
 * @attr {Object} columns
 *    TODO
 * @attr {Object} perPage
 *    TODO
 * @attr {Object} settings
 *    TODO
 * @attr {Expression} loadMoreItems
 *    TODO
 * @attr {Expression} onSort
 *    TODO
 * @attr {Expression} onRowClick
 *    TODO
 * @attr {Expression} onItemSelected
 *    TODO.
 * @example
 * <miq-tile-view type=""
 *                rows=""
 *                columns=""
 *                per-page=""
 *                settings=""
 *                load-more-items=""
 *                on-sort=""
 *                on-row-click=""
 *                on-item-selected="">
 * </miq-tile-view>
 */
export default class TileView implements ng.IComponentOptions {
  public replace = true;
  public controller = TileViewController;
  public template = require<string>('./tile-view.html');
  public controllerAs = 'tileCtrl';
  public bindings: any = {
    type: '<',
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
