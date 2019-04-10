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
  public minDate: any;
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

    if ((this.dialogField.type === 'DialogFieldDateTimeControl') ||
        (this.dialogField.type === 'DialogFieldDateControl')) {
      this.setMinDate();
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
    let fieldValue = (value ? value[selectedValue] : this.dialogField.values);
    if ((this.dialogField.type === 'DialogFieldTagControl' ||
         this.dialogField.type === 'DialogFieldDropDownList' ||
         this.dialogField.type === 'DialogFieldRadioButton') &&
        this.dialogField.default_value instanceof Array) {
        // using `default_value` if field.type is a subclass of DialogFieldSortedItem
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
   * This method disables past days selection in the date control component
   * unless 'show_past_dates' is enabled
   * @memberof DialogFieldController
   * @function setMinDate
   */
  public setMinDate() {
    this.minDate = this.dialogField.options.show_past_dates ? null : new Date();
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
