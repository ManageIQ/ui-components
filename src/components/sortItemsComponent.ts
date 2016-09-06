export class SortItemsController {
  public headers: any;
  public options: any;
  public onSort: (args: {sortId: any, isAscending: boolean}) => void;

  constructor() {
    this.initOptions();
  }

  public $onChanges(changesObj: any) {
    if (changesObj.headers) {
      this.fillFields();
    }
  }

  public initOptions() {
    this.options = {
      fields: [],
      onSortChange: (sortId: any, isAscending: boolean) => this.onSort({sortId: sortId, isAscending: isAscending})
    };
  }

  private fillFields() {
    _.each(this.headers, (oneCol) => {
      if (!oneCol.hasOwnProperty('is_narrow') && oneCol.hasOwnProperty('text')) {
        this.options.fields.push({
          id: oneCol.text.toLowerCase(),
          title:  oneCol.text,
          sortType: oneCol.sort === 'str' ? 'alpha' : 'numeric'
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
    headers: '<'
  };
}
