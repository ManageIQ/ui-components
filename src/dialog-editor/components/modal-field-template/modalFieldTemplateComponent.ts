import * as _ from 'lodash';

/**
 * Controller for the Dialog Editor Modal Field Template component
 * @ngdoc controller
 * @name ModalFieldController
 */
class ModalFieldController {
  public modalData: any;

  /*@ngInject*/
  constructor(private $scope, private $element: any) {
  }

  public $onChanges(changesObj) {
    if (changesObj.modalData && changesObj.modalData.default_value === []) {
      this.modalData.default_value = '';
    }
  }

  public entriesChange() {
    setTimeout(() => this.$element.find('select').selectpicker('refresh'));
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorModalFieldTemplate
 * @description
 *    Component contains templates for the modal for each field type
 * @example
 * <dialog-editor-modal-field-template ng-switch-when="DialogFieldTextBox"
 *                                     template="text-box.html"
 *                                     modal-data="vm.modalData">
 * </dialog-editor-modal-field-template>
 */
export default class ModalFieldTemplate {
  /*@ngInject*/
  public template = ($element: any, $attrs: any) => require(`./${$attrs.template}`);
  public scope: boolean = true;
  public controller = ModalFieldController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    modalData: '=',
    categories: '=?',
    addEntry: '=?',
    removeEntry: '=?',
    currentCategoryEntries: '=?',
    setupCategoryOptions: '=?',
    resolveCategories: '=?',
    modalTabIsSet: '<',
    modalTab: '=',
    lazyLoad: '<',
    showFullyQualifiedName: '<',
    onSelect: '<',
    treeSelectorData: '<',
    treeSelectorToggle: '<',
    treeSelectorShow: '<',
    treeSelectorIncludeDomain: '=',
  };
}
