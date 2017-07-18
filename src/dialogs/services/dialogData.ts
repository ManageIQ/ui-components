import * as _ from 'lodash';
import * as angular from 'angular';

export default class DialogDataService {
  /**
   * Sets up and configures properties for a dialog field
   * @memberof DialogDataService
   * @function setData
   * @param data {any} This is a object that is all the information for a particular dialog field
   *
   **/
  public setupField(data: any) {
    let field = _.cloneDeep(data);
    field.fieldValidation = null;
    field.fieldBeingRefreshed = false;
    field.errorMessage = '';
    if (field.type === 'DialogFieldDropDownList') {
      field.values = this.updateFieldSortOrder(field);
    }
    field.default_value = this.setDefaultValue(field);

    if (field.type === 'DialogFieldDropDownList') {
      for (let option of field.values) {
        if (option[0] === String(field.default_value)) {
          field.selected = option;
        }
      }
    }

    return field;
  }
  /**
   *
   * This method updates sort order of dialog options for a dialog field that is a drop down.
   * @memberof DialogDataService
   * @function updateFieldSortOrder
   * @param data {any} This is a object that is all the information for a particular dialog field
   *
   **/
  private updateFieldSortOrder(data) {
    const values: any = data.values;
    let sortedValues = [];
    const sortDirection = data.sort_order;
    const sortByValue = 0; // These are constants that are used to refer to array positions
    const sortByDescription = 1; // These are constants that are used to refer to array positions
    const sortBy = (data.options.sort_by === 'value' ? sortByValue : sortByDescription);
    sortedValues = values.sort((option1, option2) => {
      let trueValue: number = -1;
      let falseValue: number = 1;
      if (sortDirection !== 'ascending') {
        trueValue = 1;
        falseValue = -1;
      }

      return option2[sortBy] > option1[sortBy] ? trueValue : falseValue;
    });

    return sortedValues;
  }
  /**
   *
   * This method sets default value for a dialog field
   * @memberof DialogDataService
   * @function setDefaultValue
   * @param data {any} This is a object that is all the information for a particular dialog field
   *
   **/
  private setDefaultValue(data): any {
    let defaultValue: any = '';

    if (_.isObject(data.values)) {
      if (angular.isDefined(data.default_value) && data.default_value !== null) {
        defaultValue = data.default_value;
      } else {
        defaultValue = data.values[0][0];
      }
    } else {
      if (data.type === 'DialogFieldDateControl' || data.type === 'DialogFieldDateTimeControl') {
        defaultValue = new Date(data.values);
      } else {
        if (data.type === 'DialogFieldCheckBox') {
          defaultValue = data.values;
        }
      }
    }
    if (parseInt(data.default_value, 10)) {
      defaultValue = parseInt(data.default_value, 10);
    }

    return defaultValue;
  }
  /**
   * Checks to see if passed in value is blank
   * @memberof DialogDataService
   * @function isBlank
   * @param value {any} value to check to see if blank
   */
  private isBlank(value): any {
    return angular.isUndefined(value)
      || value === null
      || value === '';
  }
  /**
   *
   * Validates a dialog field to ensure that the values supplied meet required criteria
   * @memberof DialogDataService
   * @function validateField
   * @param field {any} This is a object that is all the information for a particular dialog field
   *
   **/
  public validateField(field): any {
    const fieldValue = field.default_value;
    const validation = {
      isValid: true,
      message: ''
    };

    if (field.required) {
      if (fieldValue === '') {
        validation.isValid = false;
        validation.message = 'This field is required';
      }
      if (field.validator_type === 'regex') {
        const regex = new RegExp(`${field.validator_rule}`);
        const regexValidates = regex.test(fieldValue);
        validation.isValid = regexValidates;
        validation.message = 'Entered text does not match required format.';
      }
    }

    return validation;
  }
}
