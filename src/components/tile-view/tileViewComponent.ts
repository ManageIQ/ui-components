import {TileType} from '../../interfaces/tileType';
import {ITableSettings, IDataTableBinding} from '../../interfaces/dataTable';
export class TileViewController implements IDataTableBinding{
  public rows: any[];
  public onSort: (args: {sortId: any; isAscending: boolean}) => void;
  public onRowClick: (args: {item: any}) => void;
  public perPage: number;
  public columns: any[];
  public options: any;
  public type: string;
  public settings: ITableSettings;
  public onItemSelected: (args: {item: any, isSelected: boolean}) => void;
  /* @ngInject */
  constructor(private $sce: any) {
    this.initOptions();
  }

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

  public trustAsHtmlQuadicon(item) {
    return this.$sce.trustAsHtml(item.quadicon);
  }

  public fetchTileName(item): string {
    const nameIndex = _.findIndex(this.columns, oneColumn => oneColumn.text && oneColumn.text.indexOf('Name') !== -1);
    return (nameIndex !== -1 && item.cells && item.cells[nameIndex]) ? item.cells[nameIndex]['text'] : '';
  }

  public $onChanges(changesObj: any) {
    if (changesObj.type) {
      this.options.type = this.type;
      console.log(this.options);
    } else if (changesObj.columns) {
      this.options.columns = this.columns;
    }
  }

  public onTileClick(item) {
    this.onItemSelected({item: item, isSelected: item === _.find(this.options.selectedItems, {id: item.id})});
  }

  public tileClass() {
    return {
      'miq-small-tile': this.type === TileType.SMALL,
      'miq-tile-with-body': this.type === TileType.BIG
    };
  }

  public perPageClick(item) {
    console.log(item);
  }

  public onSortClick(sortId, isAscending) {
    console.log(sortId, isAscending);
  }
}

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
