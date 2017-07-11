import * as _ from 'lodash';
import {IDialogs} from '../../interfaces/dialog';
import {DialogClass} from '../../interfaces/abstractDialogClass'
/**
 * @extends miqStaticAssets.dialog.DialogClass
 * @memberof miqStaticAssets.dialog
 * @ngdoc controller
 * @name DialogController
 */
export class DialogController extends DialogClass implements IDialogs {
    public dialogFields: any;
    public refreshableFields: Array<string>;
    public dialogValues: any;
    public parsedOptions: any;
    public service: any;

  /**
   * constructor
   ** DialogData - This is the data service that handles manipulating and organizing field data
   * @memberof DialogController
   * @function constructor
   * @param {Object} DialogData factory.
   */

/*@ngInject*/
constructor(private DialogData: any){
       super();
       const vm = this
       vm.dialogFields = {};
       vm.refreshableFields = [];
       vm.dialogValues = {};
       this.service = this.DialogData;
       for (var dialogTabs of this.dialog.dialog_tabs){
            for (var dialogGroup of dialogTabs.dialog_groups){
                for (var dialogField of dialogGroup.dialog_fields) {
                    dialogField.fieldValidation='';
                    vm.dialogFields[dialogField.name] = dialogField; // at this point all dialog fields are stored in a object keyed by field name
                    vm.dialogValues[dialogField.name] = '';

                    if (dialogField.auto_refresh === true || dialogField.trigger_auto_refresh === true) {
                        vm.refreshableFields.push(dialogField.name);
                    }
                }
            }
       }
    }
  /**
   * This reports all values from the dialog up to the parent component
   * The onUpdate method signature from the parent component should be updateFunctionName(data)
   *
   * saveDialogData
   * @memberof DialogController
   * @function saveDialogData
   */
    public saveDialogData () {
      const outputData = {
        validations: {},
        data: this.dialogValues
      };
      this.onUpdate({data: outputData});
    }
    /**
     * This method handles refreshing of a dialog field as well as determining wish other fields might need to be updated
     * @function updateDialogField
     * @param dialogFieldName {string} This is the field name for the particular dialog field
     * @param value {any} This is the updated value based on the selection the user made on a particular dialog field
     */
    public updateDialogField(dialogFieldName, value) {
        const refreshable = _.indexOf(this.refreshableFields,dialogFieldName);
        this.dialogFields[dialogFieldName].default_value = value;
        this.dialogValues[dialogFieldName] = value;

        if (refreshable > -1) {
            this.refreshField({ field: this.dialogFields[dialogFieldName] }).then((data) => {
                this.dialogFields[dialogFieldName] = this.updateDialogFieldData(dialogFieldName, data);
                this.updateRefreshableFields(dialogFieldName);
            });
        }
        this.saveDialogData();
    }
/**
 * This method is meant to handle auto updating of all dialog fields that are eligable to be refreshed after a field has just been refreshed
 *  @function updateRefreshableFields
 *  @param triggerFieldName {string} This is the dialog fields name that was triggered.  This is passed to ensure we don't attempt to refresh something that was just refreshed
 */
    public updateRefreshableFields(triggerFieldName){
       const fieldsToRefresh = _.without(this.refreshableFields, triggerFieldName);
       fieldsToRefresh.forEach((field) => {
            this.refreshField({ field: this.dialogFields[field] }).then((data) => {
                this.dialogFields[field] = this.updateDialogFieldData(field, data);
            });
       });
    }
/**
 *  Deals with updating select properties on a dialog field after the field has been refreshed
 *  @function updateDialogFieldData
 *  @param dialogName {string} This is the field name for the particular dialog field
 *  @param data {any} THis is the returned object after a dialog field has successfuly fetched refreshed data from the parent components refreshField function
 */
    private updateDialogFieldData(dialogName, data) {
        const dialogField = this.dialogFields[dialogName];
        dialogField.data_type = data.data_type;
        dialogField.options = data.options;
        dialogField.read_only = data.read_only;
        dialogField.required = data.required;
        dialogField.visible = data.visible;

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
 *    This is a method that is passed in that intends to handle the REST method of refreshing a single dialog field when requested.  Method signature is refreshFieldMethod(fieldToBeRefreshedObject)
 * @attr {Object} onUpdate
 *    This is a method that is invoked whenever dialog fields have updated there data or the field was updated by the user.
 * @attr {Boolean} inputDisabled boolean that decides whether or not the dialog is editable or readonly
 *
 * @example
 * <dialog dialog="myDialog"
 *         refresh-field="refreshFieldFunction(dialogField)"
 *         on-update="onUpdateFunction(allDialogDataValues)"
 *         inputDisabled="false"
 * </dialog>
 */
export default class dialog {
  public replace: boolean = true;
  public template = require('./dialog.html');
  public controller: any = DialogController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    dialog: '<',
    refreshField: '&',
    onUpdate: '&',
    inputDisabled: '=?'
  };
}
