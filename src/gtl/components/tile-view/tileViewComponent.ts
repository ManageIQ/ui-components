import {TileType} from '../../interfaces/tileType';
import {IDataTableBinding} from '../../interfaces/dataTable';
import {DataViewClass} from '../../interfaces/abstractDataViewClass';
import * as _ from 'lodash';

/**
 * Controller for tile components. It extends {@link miqStaticAssets.gtl.DataViewClass}.
 * @memberof miqStaticAssets.gtl
 * @ngdoc controller
 * @name TileViewController
 */
export class TileViewController extends DataViewClass implements IDataTableBinding {
  public type: string;
  public options: any;
  /* @ngInject */
  constructor(private $sce: any, MiQTranslateService: any) {
    super(MiQTranslateService);
    this.initOptions();
  }

  /**
   * Method for creating basic options for tiles.
   * @memberof TileViewController
   * @function initOptions
   */
  private initOptions(): void {
    this.options = {
      selectionMatchProp: 'id',
      selectItems: false,
      multiSelect: true,
      showSelectBox: true,
      selectedItems: this.filterSelected(),
      onClick: (item, event) => this.onTileClick(item),
      onCheckBoxChange: (item) => this.onTileSelect(item),
      onItemClick: (item: any, $event: any) => this.onRowClick({item: item, event: $event}),
      onButtonItemClick: (item: any) => this.onItemButtonClick(item),
      fetchTileName: (item) => this.fetchTileName(item),
      trustAsHtmlQuadicon: (item) => this.trustAsHtmlQuadicon(item),
      type: this.type
    };
  }

  /**
   * Method for enabling quadicons html to be displayed inside tile.
   * @memberof TileViewController
   * @function trustAsHtmlQuadicon
   * @param item item with quadicon.
   * @returns {any} trusted html object, which cn be used as `bind-html`.
   */
  public trustAsHtmlQuadicon(item) {
    return this.$sce.trustAsHtml(item.quadicon);
  }

  /**
   * Method for fetching name of item, it will try to guess which column should be showed as name of tile, usually it's
   * column with Name in them.
   * @memberof TileViewController
   * @function fetchTileName
   * @param item which will be displayed in tile. If no column with name is not present third cell text will be used.
   * @returns {string} text which will be displayed as tile header.
   */
  public fetchTileName(item): string {
    const nameIndex = _.findIndex(this.columns, oneColumn => oneColumn.text && oneColumn.text.indexOf('Name') !== -1);
    return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ?
      item.cells[nameIndex]['text'] :
      item.cells[2]['text'];
  }

  /**
   * Angular's method for fetching change events.
   * @memberof TileViewController
   * @function $onChanges
   * @param changesObj angular's change object.
   */
  public $onChanges(changesObj: any) {
    super.$onChanges(changesObj);
    if (changesObj.type) {
      this.options.type = this.type;
    }

    if (changesObj.settings) {
      this.options.showSelectBox = !this.settings.hideSelect;
    }

    if (changesObj.columns) {
      this.options.columns = this.columns;
    }

    this.setPagingNumbers();
  }

  /**
   * Method which will be called when clicking on tile.
   * @memberof TileViewController
   * @function onTileClick
   * @param item which tile was clicked.
   */
  public onTileClick(item) {
    if (!this.settings.hideSelect) {
      this.onItemSelected({item: item, isSelected: !item.selected});
    }
  }

  public onTileSelect(item) {
    this.onItemSelected({item: item, isSelected: item.selected});
  }

  /**
   * Method for checking all tiles and then filtering selected items.
   * @memberof TileViewController
   * @function tileClass
   * @param isSelected true | false.
   */
  public onCheckAllTiles(isSelected: boolean) {
    this.onCheckAll(isSelected);
    this.options.selectedItems = this.filterSelected();
  }

  /**
   * Method for filtering selected tiles based on checked property.
   * @memberof TileViewController
   * @function tileClass
   * @returns filtered array of checked items.
   */
  public filterSelected() {
    return _.filter(this.rows, {checked: true});
  }

  /**
   * Angular's method for getting tile's class based on it's type.
   * @memberof TileViewController
   * @function tileClass
   * @returns {Object} it will return angular class object: `{miq-small-tile: boolean, miq-tile-with-body: boolean}`
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
 *    Component for tile list. This component requires pf-tile to be part of angular's components. For patternfly's
 *    implementation look at
 *    <a href="http://angular-patternfly.rhcloud.com/#/api/patternfly.views.directive:pfCardView">pfCardView</a>
 * @memberof miqStaticAssets.gtl
 * @ngdoc component
 * @name miqTileView
 * @attr {Object} type
 *    Type of tile look at {@see miqStaticAssets.gtl.TileType}
 * @attr {Object} rows
 *    Array of rows which will be displayed.
 * @attr {Object} perPage
 *    Object which will be displayed as dropdown picker to filter number of tiles.
 * @attr {Object} columns
 *    Columns which will be displayed as header in tile.
 * @attr {Object} settings
 *    Tile settings look at {@see ITableSettings} for more information.
 * @attr {Expression} loadMoreItems
 *    Function which will be called upon loading more items. Function call has to have `start`, `perPage` params.
 * @attr {Expression} onSort
 *    Function to triggering sorting items. Function call has to have `headerId`, `isAscending` params.
 * @attr {Expression} onRowClick
 *    Function which will be executed when click on tile event is fired. Function call has to have `item` param.
 * @attr {Expression} onItemSelected
 *    Function to be called on selecting item (trough clicking on tile). Function call has to have `item`, `isSelected`
 *    params.
 * @example
 * <miq-tile-view type="ctrl.type"
 *                rows="ctrl.rows"
 *                columns="ctrl.columns"
 *                per-page="ctrl.perPage"
 *                settings="ctrl.settings"
 *                load-more-items="ctrl.onLoadMoreItems(start, perPage)"
 *                on-sort="ctrl.onSort(headerId, isAscending)"
 *                on-row-click="ctrl.onRowClick(item)"
 *                on-item-selected="ctrl.onItemSelect(item, isSelected)>
 * </miq-tile-view>
 */
export default class TileView implements ng.IComponentOptions {
  public replace = true;
  public controller = TileViewController;
  public template = require('./tile-view.html');
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
