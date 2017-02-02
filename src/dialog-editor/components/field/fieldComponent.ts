/**
 * Controller for the Dialog Editor field component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name FieldController
 */
class FieldController {
  public service: any;
  public fieldData: any;
  public boxPosition: any;

  /*@ngInject*/
  constructor(private DialogEditor: any,
              private DialogEditorModal: any) {
  }

  /**
   * Load service to be able to access it form the template.
   * @memberof FieldController
   * @function $onInit
   */
  public $onInit() {
    this.service = this.DialogEditor;
  }

  /**
   * Show modal to edit details of the component
   * @memberof FieldController
   * @function editDialogModal
   * @param {number} tab is an index of tab, where the box is placed
   * @param {number} box is an index of box, where the field is placed
   * @param {number} field is an index of field
   */
  public editDialogModal(tab: number, box: number, field: number) {
    this.DialogEditorModal.showModal(tab, box, field);
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorField
 * @description
 *    Component implementing behaviour for the fields inside of
 *    the dialogs boxes.
 * @example
 * <dialog-editor-field box-position="box.position"
 *                      field-data='field'
 * </dialog-editor-field>
 */
export default class Field {
  public template = require('./field.html');
  public controller: any = FieldController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    fieldData: '<',
    boxPosition: '<',
  };
}
