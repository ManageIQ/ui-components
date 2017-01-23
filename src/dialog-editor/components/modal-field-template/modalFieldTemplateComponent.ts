class ModalFieldController {
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorModalFieldTemplate
 * @description
 *    Component contains templates for the modal for each field type
 * @example
 * <dialog-editor-modal-field-template ng-switch-when="DialogFieldTextBox"
 *                                     template="text-box.html">
 * </dialog-editor-modal-field-template>
 */
export default class ModalFieldTemplate {
  public template = ['$element', '$attrs', function($element: any, $attrs: any) {
    return require('./' + $attrs.template);
  }];
  public controller: any = ModalFieldController;
  public controllerAs: string = 'vm';
  public scope: boolean = true;
}
