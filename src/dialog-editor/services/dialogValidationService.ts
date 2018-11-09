import {__} from '../../common/translateFunction';
import * as _ from 'lodash';

export default class DialogValidationService {
  public invalid: any = {};
  private validators: any = {};

  constructor() {
    this.validators = {
      dialog: [
        dialog => ({ status: ! _.isEmpty(dialog.label),
                     errorMessage: __('Dialog needs to have a label') }),
        dialog => ({ status: dialog.dialog_tabs.length > 0,
                     errorMessage: __('Dialog needs to have at least one tab') })
      ],
      tabs: [
        tab => ({ status: ! _.isEmpty(tab.label),
                  errorMessage: __('Dialog tab needs to have a label') }),
        tab => ({ status: tab.dialog_groups.length > 0,
                  errorMessage: __('Dialog tab needs to have at least one group') })
      ],
      groups: [
        group => ({ status: ! _.isEmpty(group.label),
                    errorMessage: __('Dialog group needs to have a label') }),
        group => ({ status: group.dialog_fields.length > 0,
                    errorMessage: __('Dialog group needs to have at least one field') })
      ],
      fields: [
        field => ({ status: ! _.isEmpty(field.name),
                    errorMessage: __('Dialog field needs to have a name') }),
        field => ({ status: ! _.isEmpty(field.label),
                    errorMessage: __('Dialog field needs to have a label') }),
        field => ({ status: ! ((field.type === 'DialogFieldDropDownList' ||
                                field.type === 'DialogFieldRadioButton')
                               && (!field.dynamic && _.isEmpty(field.values))),
                    errorMessage: __('Dropdown needs to have entries') }),
        field => ({ status: ! (field.type === 'DialogFieldTagControl'
                               && field.category_id === ''),
                    errorMessage: __('Category needs to be set for TagControl field') }),
        field => ({ status: ! (field.dynamic && _.isEmpty(field.resource_action.ae_class)),
                    errorMessage: __('Entry Point needs to be set for Dynamic elements') }),
        field => ({ status: ! ((field.type === 'DialogFieldDropDownList' ||
                                field.type === 'DialogFieldRadioButton')
                               && (field.data_type === 'integer')
                               && (!_.chain(field.values)
                                   .map(dialog_entries => _.toNumber(dialog_entries[0]))
                                   .every(value => !_.isNaN(value)).value())),
                    errorMessage: __('Value type is set as Integer, but the value entered is not a number')}),
      ],
    };
  }

  /**
   * Run validations across each dialog elements.
   * @memberof DialogValidationService
   * @function dialogIsValid
   */
  public dialogIsValid(dialogData: any) {
    const self = this;
    let validate = (f, item) => {
      let validation = f(item);
      if (! validation.status) {
        self.invalid = { element: item, message: validation.errorMessage };
      }
      return validation.status;
    };

    return _.every(dialogData, dialog =>
      _.every(this.validators.dialog, f => validate(f, dialog)) &&
      _.every((<any>dialog).dialog_tabs, tab =>
        _.every(this.validators.tabs, f => validate(f, tab)) &&
        _.every((<any>tab).dialog_groups, group =>
          _.every(this.validators.groups, f => validate(f, group)) &&
          _.every((<any>group).dialog_fields, field =>
            _.every(this.validators.fields, f => validate(f, field))
          )
        )
      )
    );
  }
}
