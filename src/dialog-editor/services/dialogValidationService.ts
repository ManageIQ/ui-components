import {__} from '../../common/translateFunction';
import * as _ from 'lodash';

export default class DialogValidationService {
  public invalid: any = [];

  /** @ngInject */
  constructor(private DialogEditor: any) {
  }

  /**
   * Run validations across each dialog elements.
   * @memberof DialogValidationService
   * @function dialogIsValid
   */
  public dialogIsValid() {
    var validators = {
      dialog: [
        dialog => ({ status: ! _.isEmpty(dialog.label),
                     errorMessage: __('Dialog needs to have a label') }),
        dialog => ({ status: dialog.dialog_tabs.length > 0,
                     errorMessage: __('Dialog needs to have at least one tab') })
      ],
      tabs: [
        tab => ({ status: ! _.isEmpty(tab.label),
                  errorMessage: __('Dialog tab needs to have a name') }),
        tab => ({ status: tab.dialog_groups.length > 0,
                  errorMessage: __('Dialog tab needs to have at least one box') })
      ],
      groups: [
        group => ({ status: ! _.isEmpty(group.label),
                    errorMessage: __('Dialog box needs to have a name') }),
        group => ({ status: group.dialog_fields.length > 0,
                    errorMessage: __('Dialog box needs to have at least one element') })
      ],
      fields: [
        field => ({ status: ! _.isEmpty(field.name),
                    errorMessage: __('Dialog element needs to have a name') }),
        field => ({ status: ! _.isEmpty(field.label),
                    errorMessage: __('Dialog element needs to have a label') })
      ]
    };

    let invalid = [];
    let validate = function (f, item) {
      let validation = f(item);
      if (!validation.status) {
        invalid.push({ message: validation.errorMessage, item: item });
      }
      return validation.status;
    };

    return _.every(DialogEditor.data.content, dialog =>
      _.every(validators.dialog, f => validate(f, dialog)) &&
      _.every(dialog.dialog_tabs, tab =>
        _.every(validators.tabs, f => validate(f, tab)) &&
        _.every(tab.dialog_groups, group =>
          _.every(validators.groups, f => validate(f, group)) &&
          _.every(group.dialog_fields, field =>
            _.every(validators.fields, f => validate(f, field)))
        )
      )
    );
  }

