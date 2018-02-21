import DialogData from './dialogData';
import * as angular from 'angular';
const dialogField = {
  'href': 'http://localhost:3001/api/service_templates/10000000000015/service_dialogs/10000000007060',
  'id': 10000000007060,
  'name': 'service_name',
  'display': 'edit',
  'display_method_options': {},
  'required': true,
  'required_method_options': {},
  'default_value': '',
  'values_method_options': {},
  'options': {
    'protected': false
  },
  'created_at': '2017-06-16T19:29:28Z',
  'updated_at': '2017-06-16T19:29:28Z',
  'label': 'Service Name',
  'dialog_group_id': 10000000002378,
  'position': 0,
  'validator_type': 'regex',
  'validator_rule': '[0-9]',
  'dynamic': false,
  'read_only': false,
  'visible': true,
  'type': 'DialogFieldTextBox',
  'resource_action': {
    'resource_type': 'DialogField',
    'ae_attributes': {}
  }
};

describe('DialogDataService test', () => {
  let dialogData;

  beforeEach(() => {
    angular.mock.module('miqStaticAssets.dialogUser');
    angular.mock.module('miqStaticAssets.common');
    angular.mock.inject(($http, MiQEndpointsService, $rootScope, $httpBackend) => {
      dialogData = new DialogData();
    });
  });

  it('should create service', () => {
    expect(dialogData).toBeDefined();
  });

  it('should set some default field properties', () => {
    const configuredField = dialogData.setupField(dialogField);
    expect(configuredField.fieldValidation).toBeDefined();
    expect(configuredField.fieldBeingRefreshed).toBe(false);
    expect(configuredField.errorMessage).toBeDefined();
  });

  describe('#setDefaultValue', () => {
    it('should allow a default value to be set', () => {
      let testField = dialogField;
      testField.default_value = 'test';
      let testDefault = dialogData.setDefaultValue(testField);
      expect(testDefault).toBe('test');
    });
    it('should ensure a checkbox uses default value that is set', () => {
      let testField = {
        default_value: 'f',
        values: 't',
        name: 'test',
        type: 'DialogFieldCheckBox'
      };
      let testDefault = dialogData.setDefaultValue(testField);
      expect(testDefault).toBe('f');
    });
    it('should prevent a form from being valid if drop down no option is selected', () => {
      const testDropDown = {
        required: true,
        type: 'DialogFieldDropDownList',
        label: 'Test Field',
        values: [
          ['', 'Test'],
          ['5', 'Test2'],
          ['2', 'Test5']
        ]
      };

      const validateFailure = {
        isValid: false,
        field: 'Test Field',
        message: 'This field is required'
      };
      const validation = dialogData.validateField(testDropDown, '');
      expect(validation).toEqual(validateFailure);
    });
    describe('when the data type is a date control', () => {
      let dateField = {'type': 'DialogFieldDateControl'};

      describe('when the values are undefined', () => {
        beforeEach(() => {
          dateField['values'] = undefined;
        });

        it('returns a new date', () => {
          let todaysDate = new Date();
          let expectedDate = dialogData.setDefaultValue(dateField);
          expect(expectedDate.getFullYear()).toEqual(todaysDate.getFullYear());
          expect(expectedDate.getMonth()).toEqual(todaysDate.getMonth());
          expect(expectedDate.getDate()).toEqual(todaysDate.getDate());
          expect(expectedDate.getHours()).toEqual(todaysDate.getHours());
          expect(expectedDate.getMinutes()).toEqual(todaysDate.getMinutes());
        });
      });

      describe('when the values exist', () => {
        beforeEach(() => {
          dateField['values'] = '2017-09-18';
        });

        it('returns a new date based on the values', () => {
          expect(dialogData.setDefaultValue(dateField)).toEqual(new Date('2017-09-18'));
        });
      });
    });
  });

  it('should allow a select list to be sorted', () => {
    const testDropDown = {
      values: [
        [0, 'Test'],
        [5, 'Test2'],
        [2, 'Test5']
      ],
      options: { sort_by: 'value', sort_order: 'descending', data_type: 'integer' }
    };
    const testSorted = dialogData.updateFieldSortOrder(testDropDown);
    const expectedResult = [[5, 'Test2'], [2, 'Test5'], [0, 'Test']];
    expect(testSorted).toEqual(expectedResult);
    const testDropDownDescription = {
      values: [
        [0, 'B'],
        [5, 'C'],
        [2, 'A']
      ],
      options: { sort_by: 'description', sort_order: 'descending' }
    };
    const testSortedDescription = dialogData.updateFieldSortOrder(testDropDownDescription);
    const expectedSortedResult = [[5, 'C'], [0, 'B'], [2, 'A']];
    expect(testSortedDescription).toEqual(expectedSortedResult);
  });
  it('should allow a numeric Description field to be sorted in a dropdown', () => {
    const testDropDownDescription = {
      values: [
        ['zero', '0'],
        ['five', '5'],
        ['two', '2']
      ],
      options: { sort_by: 'description', sort_order: 'descending' }
    };
    const testSortedDescription = dialogData.updateFieldSortOrder(testDropDownDescription);
    const expectedSortedResult = [['five', '5'], ['two', '2'], ['zero', '0']];
    expect(testSortedDescription).toEqual(expectedSortedResult);
  });
});
