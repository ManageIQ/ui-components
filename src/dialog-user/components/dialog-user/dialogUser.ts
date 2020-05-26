import * as _ from 'lodash';
import { IDialogs } from '../../interfaces/dialog';
import { DialogClass } from '../../interfaces/abstractDialogClass';
import {__} from '../../../common/translateFunction';

/**
 * @extends miqStaticAssets.dialog.DialogClass
 * @memberof miqStaticAssets.dialogUser
 * @ngdoc controller
 * @name DialogUserController
 */
export class DialogUserController extends DialogClass implements IDialogs {
  public dialogFields: any;
  public refreshableFields: Array<string>;
  public dialogValues: any;
  public fieldAssociations: any;
  public parsedOptions: any;
  public service: any;
  public refreshRequestCount: number;
  public areFieldsBeingRefreshed: boolean;

  /**
   * constructor
   ** DialogData - This is the data service that handles manipulating and organizing field data
   * @memberof DialogUserController
   * @function constructor
   * @param {Object} DialogData factory.
   */

  /* @ngInject */
  constructor(private DialogData, private $q) {
    super();
  }

  /**
   * Runs when component is initialized
   * @memberof DialogUserController
   * @function $onInit
   */
  public $onInit() {
    this.dialogFields = {};
    this.refreshableFields = [];
    this.fieldAssociations = {};
    this.dialogValues = {};
    this.refreshRequestCount = 0;
    this.areFieldsBeingRefreshed = false;
    this.inputDisabled = this.inputDisabled || false;

    this.service = this.DialogData;
    for (const dialogTabs of this.dialog.dialog_tabs) {
      for (const dialogGroup of dialogTabs.dialog_groups) {
        for (const dialogField of dialogGroup.dialog_fields) {
          this.initField(dialogField);
        }
      }
    }

    this.saveDialogData();
  }

  private initField(dialogField) {
    this.dialogFields[dialogField.name] = this.service.setupField(dialogField);
    this.dialogValues[dialogField.name] = this.dialogFields[dialogField.name].default_value;

    if (dialogField.dialog_field_responders !== undefined) {
      this.fieldAssociations[dialogField.name] = dialogField.dialog_field_responders;
    } else if (dialogField.auto_refresh === true || dialogField.trigger_auto_refresh === true) {
      this.refreshableFields.push(dialogField.name);
    }
  }

  /**
  * This reports all values from the dialog up to the parent component
  * The onUpdate method signature from the parent component should be updateFunctionName(data)
  *
  * saveDialogData
  * @memberof DialogUserController
  * @function saveDialogData
  */
  public saveDialogData() {
    const outputData = {
      validations: this.validateFields(),
      data: this.dialogValues
    };
    this.onUpdate({ data: outputData });
    this.service.data = {
      fields: this.dialogFields,
      values: this.dialogValues,
    };
  }

  public validateFields() {
    const validations = {
      isValid: true,
      messages: [], // currently unused, should be?
    };

    if (this.areFieldsBeingRefreshed) {
      validations.isValid = false;
      validations.messages.push({
        message: __('Fields are being refreshed'),
      });
    } else {
      _.forIn(this.dialogFields, (field, fieldName) => {
        const dialogValue = this.dialogValues[fieldName];
        let validation = this.service.validateField(field, dialogValue);

        if (! validation.isValid) {
          validations.isValid = false;
          validations.messages.push(validation);
        }
      });
    }

    return validations;
  }

  /**
   * This method handles refreshing of a dialog field as well
   * as determining which other fields might need to be updated
   * @memberof DialogUserController
   * @function updateDialogField
   * @param dialogFieldName {string} This is the field name for the particular dialog field
   * @param value {any} This is the updated value based on the selection the user made on a particular dialog field
   */
  public updateDialogField(dialogFieldName, value) {
    let hasFieldsToUpdate = this.fieldAssociations && this.fieldAssociations[dialogFieldName]
      && this.fieldAssociations[dialogFieldName].length;

    this.dialogValues[dialogFieldName] = value;
    if (hasFieldsToUpdate) {
      this.determineRefreshRequestCount(dialogFieldName);
      this.areFieldsBeingRefreshed = true;
    }

    this.saveDialogData();

    if (hasFieldsToUpdate) {
      this.updateTargetedFieldsFrom(dialogFieldName);
    } else {
      const refreshable = _.indexOf(this.refreshableFields, dialogFieldName);
      if (refreshable > -1  && !this.areFieldsBeingRefreshed) {
        const fieldsToRefresh = _.without(this.refreshableFields, dialogFieldName);
        this.updateRefreshableFields(fieldsToRefresh);
      }
    }
  }

  /**
   * This method is meant to handle auto updating of all dialog fields
   * that are eligable to be refreshed after a field has just been refreshed
   *  @memberof DialogUserController
   *  @function updateRefreshableFields
   *  @param refreshableFields {array} This is the dialog fields name that was triggered.
   *  This is passed to ensure we don't attempt to refresh something that was just refreshed
   */
  public updateRefreshableFields(refreshableFields): void {
    const field = refreshableFields[0];
    this.areFieldsBeingRefreshed = true;
    this.dialogFields[field].fieldBeingRefreshed = true;
    const fieldsLeftToRefresh = _.without(refreshableFields, field);
    this.refreshField({ field: this.dialogFields[field] }).then((data) => this.refreshFieldCallback(field, data));
  }

  public determineRefreshRequestCount(fieldName): void {
    _.forEach(this.fieldAssociations[fieldName], (field: any) => {
      this.refreshRequestCount++;
      if (! _.isEmpty(this.fieldAssociations[field])) {
        this.determineRefreshRequestCount(field);
      }
    });
  }

  /**
   * This method handles the updating of all dialogs fields that
   * are set to trigger after another field has just been refreshed
   * @memberof DialogUserController
   * @function updateTargetedFieldsFrom
   * @param dialogFieldName {string} This is the dialog field name that just refreshed.
   * This is used to determine which fields are targeted from that field
   */
  public updateTargetedFieldsFrom(dialogFieldName): void {
    if (! this.areFieldsBeingRefreshed) {
      this.determineRefreshRequestCount(dialogFieldName);
    }

    let promiseList = [];
    _.forEach(this.fieldAssociations[dialogFieldName], (field: any) => {
      promiseList.push(this.refreshSingleField(field));
    });

    this.$q.all(promiseList).then((_data) => {
      this.refreshRequestCount -= promiseList.length;
      if (this.refreshRequestCount === 0) {
        this.areFieldsBeingRefreshed = false;
      }
      this.saveDialogData();
    });
  }

  public refreshSingleField(field) {
    if (! this.areFieldsBeingRefreshed) {
      this.determineRefreshRequestCount(field);
      this.areFieldsBeingRefreshed = true;
      this.saveDialogData();
    }

    this.dialogFields[field].fieldBeingRefreshed = true;

    return this.refreshField({ field: this.dialogFields[field] }).then((data) => {
      this.refreshFieldCallback(field, data);
      return data;
    });
  }

  /**
   *  Handles all of the necessary functions after a field has been refreshed
   *  @memberof DialogUserController
   *  @function refreshFieldCallback
   *  @param field {any} This is the field to update and read associations from
   *  @param data {any} This is the data being returned from refreshField
   */

  private refreshFieldCallback(field, data) {
    this.updateDialogFieldData(field, data);
    this.initField(this.dialogFields[field]);

    this.dialogFields[field].fieldBeingRefreshed = false;

    this.saveDialogData();

    if (! _.isEmpty(this.fieldAssociations[field])) {
      this.updateTargetedFieldsFrom(field);
    } else if (this.refreshRequestCount === 0) {
      this.areFieldsBeingRefreshed = false;
      this.saveDialogData();
    }
  }

  /**
   *  Deals with updating select properties on a dialog field after the field has been refreshed
   *  @memberof DialogUserController
   *  @function updateDialogFieldData
   *  @param dialogName {string} This is the field name for the particular dialog field
   *  @param data {any} This is the returned object after a dialog field has successfuly fetched
   *  refreshed data from the parent components refreshField function
   */
  private updateDialogFieldData(dialogName, data) {
    const dialogField = this.dialogFields[dialogName];
    dialogField.data_type = data.data_type;
    dialogField.options = data.options;
    dialogField.read_only = data.read_only;
    dialogField.required = data.required;
    dialogField.visible = data.visible;
    dialogField.values = data.values;
    dialogField.default_value = data.default_value;
    dialogField.validator_rule = data.validator_rule;
    dialogField.validator_type = data.validator_type;

    return dialogField;
  }
}

/**
 * @description
 *    Component for dialogs
 * @memberof miqStaticAssets.dialogs
 * @ngdoc component
 * @name dialog
 * @attr {Object} dialog
 *    This object contains a Dialog and all the groups, tabs, and fields associated with it
 * @attr {Object} refreshField
 *    This is a method that is passed in that intends to handle the REST method of refreshing a single
 *    dialog field when requested. Method signature is refreshFieldMethod(fieldToBeRefreshedObject)
 * @attr {Object} onUpdate
 *    This is a method that is invoked whenever dialog fields have updated
 *    there data or the field was updated by the user.
 * @attr {Boolean} inputDisabled boolean that decides whether or not the dialog is editable or readonly
 *
 * @example
 * <dialog-user dialog="myDialog"
 *         refresh-field="refreshFieldFunction(dialogField)"
 *         on-update="onUpdateFunction(allDialogDataValues)"
 *         inputDisabled="false">
 * </dialog-user>
 */
export default class DialogUser {
  public replace: boolean = true;
  public template = require('./dialog.html');
  public controller: any = DialogUserController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    dialog: '<',
    refreshField: '&',
    onUpdate: '&',
    inputDisabled: '=?',
    reconfigureMode: '<'
  };
}
