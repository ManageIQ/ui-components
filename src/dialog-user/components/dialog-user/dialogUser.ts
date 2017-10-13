import * as _ from 'lodash';
import { IDialogs } from '../../interfaces/dialog';
import { DialogClass } from '../../interfaces/abstractDialogClass';

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
  public parsedOptions: any;
  public service: any;
  public areFieldsBeingRefreshed: boolean;
  /**
   * constructor
   ** DialogData - This is the data service that handles manipulating and organizing field data
   * @memberof DialogUserController
   * @function constructor
   * @param {Object} DialogData factory.
   */

  /*@ngInject*/
  constructor(private DialogData: any,private $scope : ng.IScope) {
    super();
  }
  /**
   * Runs when component is initialized
   * @memberof DialogUserController
   * @function $onInit
   */
  public $onInit() {
    const vm = this;
    vm.dialogFields = {};
    vm.refreshableFields = [];
    vm.dialogValues = {};
    vm.areFieldsBeingRefreshed = false;
    this.service = this.DialogData;
    for (const dialogTabs of this.dialog.dialog_tabs) {
      for (const dialogGroup of dialogTabs.dialog_groups) {
        for (const dialogField of dialogGroup.dialog_fields) {
          vm.dialogFields[dialogField.name] = this.service.setupField(dialogField);
          // at this point all dialog fields are stored in a object keyed by field name
          vm.dialogValues[dialogField.name] = vm.dialogFields[dialogField.name].default_value;
          if (dialogField.auto_refresh === true || dialogField.trigger_auto_refresh === true) {
            vm.refreshableFields.push(dialogField.name);
          }
        }
      }
    }
    vm.saveDialogData();
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
  }
  public validateFields() {
    const validations = {
      isValid: true,
      messages: []
    };
    _.forIn(this.dialogFields, (field, fieldName) => {
      const dialogValue = this.dialogValues[fieldName];
      let validation = this.service.validateField(field, dialogValue);
      if (!validation.isValid) {
        validations.isValid = false;
        validations.messages.push(validation);
      }
    });

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
    const refreshable = _.indexOf(this.refreshableFields, dialogFieldName);
    this.dialogFields[dialogFieldName].default_value = value;
    this.dialogValues[dialogFieldName] = value;
    this.saveDialogData();
    if (refreshable > -1  && !this.areFieldsBeingRefreshed) {
        const fieldsToRefresh = _.without(this.refreshableFields, dialogFieldName);
        this.updateRefreshableFields(fieldsToRefresh);
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
    this.refreshField({ field: this.dialogFields[field] }).then((data) => {
      this.dialogFields[field] = this.updateDialogFieldData(field, data);
      this.dialogFields[field].fieldBeingRefreshed = false;
      this.saveDialogData();
      this.$scope.$apply();
      if (fieldsLeftToRefresh.length > 0) {
        this.updateRefreshableFields(fieldsLeftToRefresh);
      } else {
        this.areFieldsBeingRefreshed = false;
      }
    });
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
    inputDisabled: '=?'
  };
}
