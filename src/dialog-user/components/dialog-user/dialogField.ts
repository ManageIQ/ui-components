import * as _ from 'lodash';
import * as angular from 'angular';

/**
 * This component deals with an individual dialog field
 * @memberof miqStaticAssets.dialogUser
 * @ngdoc controller
 * @name DialogFieldController
 */
export class DialogFieldController {
  public field: any;
  public onUpdate: any;
  public singleRefresh: any;
  public options: any;
  public inputDisabled: boolean;

  public service: any;
  public dialogField: any;
  public validation: any;
  public minDate: any;
  public clonedDialogField: any;

  /* @ngInject */
  constructor(DialogData: any) {
    this.service = DialogData;
  }

  /**
   * Sets up the dialog field with defaults
   * @memberof DialogFieldController
   * @function $onInit
   */
  public $onInit() {
    this.setup();
  }

  /**
   * Checks to see if the dialog field has changed and re runs field setup if the field has changed
   * @memberof DialogFieldController
   * @function $doCheck
   */
  public $doCheck() {
    if (!_.isEqual(this.field, this.clonedDialogField)) {
      this.setup();
    }
  }

  // run field setup on field init or change
  public setup() {
    this.clonedDialogField = _.cloneDeep(this.field);
    this.dialogField = this.service.setupField(this.field);

    if ((this.dialogField.type === 'DialogFieldDateTimeControl') ||
        (this.dialogField.type === 'DialogFieldDateControl')) {
      this.setMinDate();
    }

    if (this.dialogField.type === 'DialogFieldDateTimeControl') {
      // dateTimeFieldChanged handles merging back to default_value
      this.dialogField.dateField = new Date(this.dialogField.default_value);
      this.dialogField.timeField = new Date(this.dialogField.default_value);

      if (! this.dialogField.default_value) {
        // clearing the date nulls the date field, so we're using that to represent null
        // timeField can't be null otherwise changing just date field to non-null would reset back to null
        this.dialogField.dateField = null;
      }
    }

    this.validateField();
  }

  // validate field, set validation
  private validateField() {
    const field = this.dialogField;
    this.validation = this.service.validateField(field, field.default_value);
  }

  /**
   * This method is meant to be called whenever values change on a field.
   * It facilitates reporting updates to the parent component
   * @memberof DialogFieldController
   * @function changesHappened
   */
  public changesHappened() {
    this.validateField();

    const field = this.dialogField;
    this.onUpdate({
      dialogFieldName: field.name,
      value: field.default_value,
    });
  }

  /**
   * This method is a 'changesHappened' method specific to dateTime fields.
   * It joins the two date and time models to then delegate to changesHappened.
   * @memberof DialogFieldController
   * @function dateTimeFieldChanged
   */
  public dateTimeFieldChanged() {
    let dateField = this.dialogField.dateField;
    let timeField = this.dialogField.timeField;

    if (! dateField) {
      // cleared
      // timeField can't be null, see setup()
      this.dialogField.dateField = null;
      this.dialogField.default_value = null;
      return this.changesHappened();
    }

    let fullYear = dateField.getFullYear();
    let month = dateField.getMonth();
    let date = dateField.getDate();

    let hours = timeField.getHours();
    let minutes = timeField.getMinutes();

    this.dialogField.default_value = new Date(fullYear, month, date, hours, minutes);
    return this.changesHappened();
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
