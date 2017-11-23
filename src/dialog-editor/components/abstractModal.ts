import * as _ from 'lodash';

class ModalController {
  private uibModalInstance: any;
  private saveModal: any;

  /*@ngInject*/
  constructor(private DialogEditor: any) {
  }

  public closeModal(save: boolean) {
    if (save) {
      this.saveModal();
    }
    this.uibModalInstance.close();
  }
}

export default class AbstractModal {
  public controller = ModalController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    modalData: '=',
    elementInfo: '<',
    categories: '=?',
    addEntry: '=?',
    removeEntry: '=?',
    currentCategoryEntries: '=?',
    resolveCategories: '=?',
    modalTabIsSet: '<',
    modalTabSet: '<',
    modalTab: '=',
    saveModal: '<',
    uibModalInstance: '<',
    lazyLoad: '<',
    onSelect: '<',
    showFullyQualifiedName: '<',
    treeSelectorData: '=',
    treeSelectorToggle: '<',
    treeSelectorShow: '=',
    treeSelectorIncludeDomain: '=',
  };
}
