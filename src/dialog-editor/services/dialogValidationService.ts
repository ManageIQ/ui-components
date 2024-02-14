import {__} from '../../common/translateFunction';
import {sprintf} from 'sprintf-js';
import * as _ from 'lodash';

const tagHasCategory = (field) => field.options && field.options.category_id;

export default class DialogValidationService {
  public invalid: any = {};
  public dialogFields: any = [];
  private validators: any = {};

  constructor() {
    this.validators = {
      dialog: [
        dialog => ({ status: ! _.isEmpty(dialog.label),
                     errorMessage: __('Dialog needs to have a label'),
                     local: true }),
        dialog => ({ status: dialog.dialog_tabs.length > 0,
                     errorMessage: __('Dialog needs to have at least one tab'),
                     local: false })
      ],
      tabs: [
        tab => ({ status: ! _.isEmpty(tab.label),
                  errorMessage: __('Dialog tab needs to have a label'),
                  local: true }),
        tab => ({ status: tab.dialog_groups.length > 0,
                  errorMessage: __('Dialog tab needs to have at least one section'),
                  local: false })
      ],
      groups: [
        group => ({ status: ! _.isEmpty(group.label),
                    errorMessage: __('Dialog section needs to have a label'),
                    local: true }),
        group => ({ status: group.dialog_fields.length > 0,
                    errorMessage: __('Dialog section needs to have at least one field'),
                    local: false })
      ],
      fields: [
        field => ({ status: ! _.isEmpty(field.name),
                    errorMessage: __('Dialog field needs to have a name'),
                    local: true }),
        field => ({ status: ! _.isEmpty(field.label),
                    errorMessage: __('Dialog field needs to have a label'),
                    local: true }),
        field => ({ status: ! ((field.type === 'DialogFieldDropDownList' ||
                                field.type === 'DialogFieldRadioButton')
                               && (!field.dynamic && _.isEmpty(field.values))),
                    errorMessage: __('Dropdown needs to have entries'),
                    local: true }),
        field => ({ status: (field.type !== 'DialogFieldTagControl') || tagHasCategory(field),
                    errorMessage: __('Category needs to be set for TagControl field'),
                    local: true }),
        field => ({ status: ! (field.dynamic && !field.resource_action.configuration_script_id && _.isEmpty(field.resource_action.ae_class)),
                    errorMessage: __('Entry Point needs to be set for Dynamic elements'),
                    local: true }),
        field => ({ status: ! ((field.type === 'DialogFieldDropDownList' ||
                                field.type === 'DialogFieldRadioButton')
                               && (field.data_type === 'integer')
                               && (!_.chain(field.values)
                                   .map(dialog_entries => _.toNumber(dialog_entries[0]))
                                   .every(value => !_.isNaN(value)).value())),
                    errorMessage: __('Value type is set as Integer, but the value entered is not a number'),
                    local: true }),
      ],
    };
  }

  private validate = (item, description, local = false) => ((fn) => {
    let validation = fn(item);
    if (local && !validation.local) {
      return true;
    }
    if (! validation.status) {
      Object.assign(this.invalid, {
        item,
        description,
        message: validation.errorMessage,
      });
    }
    return validation.status;
  })

  public validateDialog(dialog, local = false) {
    const label = dialog.label ? sprintf(__('Dialog %s'), dialog.label) : __('Unnamed Dialog');
    return _.every(this.validators.dialog, this.validate(dialog, label, local));
  }

  public validateTab(tab, local = false) {
    const label = tab.label ? sprintf(__('Tab %s'), tab.label) : __('Unnamed Tab');
    return _.every(this.validators.tabs, this.validate(tab, label, local));
  }

  public validateGroup(group, local = false) {
    const label = group.label ? sprintf(__('Section %s'), group.label) : __('Unnamed Section');
    return _.every(this.validators.groups, this.validate(group, label, local));
  }

  public validateField(field, local = false) {
    const label = field.label ? sprintf(__('Field %s'), field.label) : __('Unnamed Field');
    return _.every(this.validators.fields, this.validate(field, label, local));
  }

  /**
   * Run validations across each dialog field elements and check for duplicate field names.
   * @memberof DialogValidationService
   * @function validateDialogFields
   */
  public validateDialogFields(field: any) {
    if (!this.validateField(field)) {
      return false;
    }
    const isDuplicate = this.dialogFields.includes(field.name);
    if (isDuplicate) {
      this.invalid.message = sprintf(__('Duplicate field name found: %s'), field.name);
      return false;
    }
    this.dialogFields.push(field.name);
    return true;
  }

  /**
   * Run validations across each dialog elements.
   * @memberof DialogValidationService
   * @function dialogIsValid
   */
  public dialogIsValid(dialogData: any) {
    this.dialogFields = [];
    this.invalid.message = null;

    return _.every(dialogData, dialog =>
      this.validateDialog(dialog) &&
      _.every((<any>dialog).dialog_tabs, tab =>
        this.validateTab(tab) &&
        _.every((<any>tab).dialog_groups, group =>
          this.validateGroup(group) &&
          group.dialog_fields.every((field) => this.validateDialogFields(field))
        )
      )
    );
  }
}
