export class PagingController {
  public settings: any;
  public pages: any;
  public onChangePage: (args: {pageNumber: any}) => void;
  private MAX_PAGES = 6;

  public updatePages(total) {
    if (total > this.MAX_PAGES) {
      this.pages = _.times(this.MAX_PAGES, item => this.settings.current + item);
    } else {
      this.pages = new Array(total);
    }
    return this.pages;
  }
}

export default class Paging implements ng.IComponentOptions {
  public replace = true;
  public controller = PagingController;
  public template = require<string>('./paging.html');
  public controllerAs = 'pagingCtrl';
  public bindings: any = {
    settings: '<',
    onChangePage: '&'
  };
}
