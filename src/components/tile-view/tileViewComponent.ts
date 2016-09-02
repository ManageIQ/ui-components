import {TileType} from '../../interfaces/tileType';
export class TileViewcontroller {
  public perPage: number;
  public items: any[];
  public columns: any[];
  public options: any;
  public type: string;
  /* @ngInject */
  constructor() {
    this.initOptions();
  }

  private initOptions(): void {
    this.options = {
      selectionMatchProp: 'id',
      selectItems: true,
      multiSelect: true,
      showSelectBox: false,
      onClick: _.bind(this.handleClick, this),
      fetchTileName: _.bind(this.fetchTileName, this),
      selectedItems: this.filterSelected(),
    };
  }

  public fetchTileName(item): string {
    const nameIndex = _.findIndex(this.columns, {text: "Name"}) - 1;
    return (nameIndex != -1 && item.cells && item.cells[nameIndex])? item.cells[nameIndex]['text'] : '';
  }

  public $onChanges(changesObj: any) {
    if (changesObj.type) {
      this.options.type = this.type;
    } else if (changesObj.columns) {
      this.options.columns = this.columns;
    }
  }

  public tileClass() {
    return {
      'miq-small-tile': this.type === TileType.SMALL,
      'miq-tile-with-body': this.type === TileType.BIG
    }
  }

  public handleClick() {
    console.log('ontileClick');
  }

  public filterSelected() {
    return [];
  }
}

export default class TileView implements ng.IComponentOptions {
  public replace = true;
  public controller = TileViewcontroller;
  public template = require<string>('./tile-view.html');
  public controllerAs = 'tileCtrl';
  public bindings: any = {
    type: '<',
    rows: '<',
    columns: '<',
    loadMoreItems: '&',
    onSort: '&',
    onRowClick: '&',
    onItemSelected: '&'
  };
}
