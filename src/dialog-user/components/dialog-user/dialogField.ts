import { DialogFieldClass } from '../../interfaces/abstractDialogFieldClass';
import * as _ from 'lodash';
/**
 * This component deals with an individual dialog field
 *
 * @extends miqStaticAssets.dialog.DialogFieldClass
 * @memberof miqStaticAssets.dialogUser
 * @ngdoc controller
 * @name DialogFieldController
 */

export class DialogFieldController extends DialogFieldClass {
  public service: any;
  public dialogValue: any;
  public dialogField: any;
  public clonedDialogField: any;

  /*@ngInject*/
  constructor(private DialogData: any) {
    super();
  }

  /**
   * Sets up the dialog field with defaults
   * @memberof DialogFieldController
   * @function $onInit
   */
  public $onInit() {
    this.service = this.DialogData;
    this.clonedDialogField = _.cloneDeep(this.field);
    this.dialogField = this.field;
  }

  /**
   * Checks to see if the dialog field has changed and re runs field setup if the field has changed
   * @memberof DialogFieldController
   * @function $doCheck
   */
  public $doCheck() {
    if (!_.isEqual(this.field, this.clonedDialogField)) {
      this.clonedDialogField = _.cloneDeep(this.field);
      this.dialogField = this.service.setupField(this.field);
    }
  }

  /**
   * This method is meant to be called whenever values change on a field.
   * It facilitates reporting updates to the parent component
   * @memberof DialogFieldController
   * @function changesHappened
   */
  public changesHappened() {
    let fieldValue = this.dialogField.default_value;
    if ((this.dialogField.type === 'DialogFieldTagControl' || this.dialogField.type === 'DialogFieldDropDownList')
        && this.dialogField.default_value instanceof Array) {
        fieldValue = this.dialogField.default_value.join();
      }
    this.onUpdate({ dialogFieldName: this.field.name, value: fieldValue });
  }

  /**
   * This method validates a dialog field to ensure its current values are valid
   * @memberof DialogFieldController
   * @function validateField
   *
   */
  public validateField() {
    let validation = { isValid: true, message: '' };
    validation = this.service.validateField(this.dialogField);
    this.dialogField.fieldValidation = validation.isValid;
    this.dialogField.errorMessage = validation.message;
    return validation;
  }
}

export default class DialogField {

  public replace: boolean = true;
  public template = require('./dialogField.html');
  public controller: any = DialogFieldController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    field: '<',
    onUpdate: '&',
    options: '=?',
    inputDisabled: '=?'
  };
}
