import { DialogFieldClass } from '../../interfaces/abstractDialogFieldClass';
import * as _ from 'lodash';
import * as angular from 'angular';
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
  public validation: any;
  public clonedDialogField: any;
  /*@ngInject*/
  constructor(private DialogData: any, private $window: any) {
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
    this.validation = null;
    if (this.dialogField.type === 'DialogFieldTagControl') {
      this.setDefaultValue();
    }

    if (this.dialogField.type === 'DialogFieldDateTimeControl') {
      this.dateTimeFieldChanged();
    }
  }

  /**
   * Checks to see if the dialog field has changed and re runs field setup if the field has changed
   * @memberof DialogFieldController
   * @function $doCheck
   */
  public $doCheck() {
    if (!_.isEqual(this.field, this.clonedDialogField)) {
      this.clonedDialogField = _.cloneDeep(this.field);
      if (_.isObject(this.validation)) {
        this.field.fieldValidation = this.validation.isValid;
        this.field.errorMessage = this.validation.message;
      }
      this.dialogField = this.service.setupField(this.field);
    }
  }

  /**
   * This method is meant to be called whenever values change on a field.
   * It facilitates reporting updates to the parent component
   * @memberof DialogFieldController
   * @function changesHappened
   */
  public changesHappened(value) {
    const selectedValue = 0;
    this.validation = this.validateField();
    let fieldValue = (value ? value[selectedValue] : this.dialogField.default_value);
    if ((this.dialogField.type === 'DialogFieldTagControl' ||
         this.dialogField.type === 'DialogFieldDropDownList') &&
        this.dialogField.default_value instanceof Array) {
        fieldValue = this.dialogField.default_value.join();
      }
    this.onUpdate({ dialogFieldName: this.field.name, value: fieldValue });
  }

  /**
   * This method is a 'changesHappened' method specific to dateTime fields.
   * It joins the two date and time models to then delegate to changesHappened.
   * @memberof DialogFieldController
   * @function dateTimeFieldChanged
   */
  public dateTimeFieldChanged() {
    let dateField = this.dialogField.dateField;
    let fullYear = dateField.getFullYear();
    let month = dateField.getMonth();
    let date = dateField.getDate();

    if (this.dialogField.timeField === undefined) {
      this.dialogField.timeField = new Date();
    }

    let hours = this.dialogField.timeField.getHours();
    let minutes = this.dialogField.timeField.getMinutes();

    let fullDate = new Date(fullYear, month, date, hours, minutes);
    this.changesHappened([fullDate]);
  }

  /**
   * This will convert the values stored in dialogField.default_value to an array
   * for use with a multiple-select field because by default it comes in as a string
   * @memberof DialogFieldController
   * @function convertValuesToArray
   */
  public convertValuesToArray() {
    this.dialogField.default_value = angular.fromJson(this.dialogField.default_value);
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

  public refreshSingleField() {
    this.singleRefresh({ field: this.field.name });
  }

  /**
   * This method is setting the default_value for a tag control's select box.
   * In case the default_value is not set for the ng-model of the component,
   * an empty value option is displayed
   * @memberof DialogFieldController
   * @function setDefaultValue
   */
  private setDefaultValue() {
    let defaultOption = _.find(this.dialogField.values, { id: null });
    if (defaultOption) {
      defaultOption.id = 0;
      this.dialogField.default_value = defaultOption.id;
    }
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
    singleRefresh: '&',
    options: '=?',
    inputDisabled: '=?'
  };
}
