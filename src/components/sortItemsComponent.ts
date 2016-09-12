export class SortItemsController {
  public headers: any;
  public options: any;
  public sortObject: any;
  public onSort: (args: {sortObject: any, isAscending: boolean}) => void;

  constructor() {
    this.initOptions();
  }

  public $onChanges(changesObj: any) {
    if (changesObj.headers) {
      this.fillFields();
      if (this.sortObject) {
        this.setSortItem();
      }
    }
  }

  public setSortItem() {
    this.options.currentField = {
      colId: this.headers.indexOf(this.sortObject.sortObject),
      id: this.sortObject.sortObject.text.toLowerCase(),
      title: this.sortObject.sortObject.text
    };
    this.options.isAscending = this.sortObject.isAscending;
  }

  public initOptions() {
    this.options = {
      fields: [],
      onSortChange: (item: any, isAscending: boolean) => this.onSort({sortObject: item, isAscending: isAscending}),
      currentField: {}
    };
  }

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
}
export default class SortItems implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = `<div pf-sort config="vm.options"></div>`;
  public controller = SortItemsController;
  public controllerAs = 'vm';
  public bindings: any = {
    onSort: '&',
    headers: '<',
    sortObject: '<'
  };
}
