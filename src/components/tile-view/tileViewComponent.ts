export class TileViewcontroller {
  public perPage: number;
  public items: any[];
  public headers: any[];
  public options: any;
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
      selectedItems: this.filterSelected(),
    };
  }

  public handleClick() {
    console.log('ontileClick');
  }

  public filterSelected() {
    console.log('onFilerClick');
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
