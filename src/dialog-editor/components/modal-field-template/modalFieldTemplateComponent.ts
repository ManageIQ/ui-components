import * as _ from 'lodash';

/**
 * Controller for the Dialog Editor Modal Field Template component
 * @ngdoc controller
 * @name ModalFieldController
 */
class ModalFieldController {
  public modalData: any;

  /*@ngInject*/
  constructor(private $scope) {
  }

  public $onInit() {
    this.$scope.$watch('vm.modalData.options.force_multi_value', () => {
      if (this.modalData.options.force_multi_value) {
        this.modalData.default_value = [];
      }
    });
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
