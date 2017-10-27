class ModalController {
  private uibModalInstance: any;
  private saveModal: any;

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
  };
}
