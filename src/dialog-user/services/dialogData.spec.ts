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
    expect(configuredField.fieldBeingRefreshed).toBe(false);
  });

  describe('#setupField', () => {
    describe('when the field is a drop down list', () => {
      describe('when the field is an integer type', () => {
        describe('when the field has no default value', () => {
          it('stores the values without forcing null into a NaN', () => {
            let testField = {
              'data_type': 'integer',
              'default_value': null,
              'values': [[null, '<None>'], ['1', 'One'], ['2', 'Two']],
              'type': 'DialogFieldDropDownList',
              'options': {'sort_by': 'description', 'sort_order': 'ascending'}
            };
            let newField = dialogData.setupField(testField);
            expect(newField.values[0]).toEqual([null, '<None>']);
          });
        });
      });

      describe('when the field sort_by is none', () => {
        it('does not attempt to sort the values', () => {
          let testField = {
            'data_type': 'string',
            'default_value': null,
            'values': [['2', 'Two'], ['1', 'One'], ['3', 'Three']],
            'type': 'DialogFieldDropDownList',
            'options': {'sort_by': 'none', 'sort_order': 'ascending'}
          };
          let newField = dialogData.setupField(testField);
          expect(newField.values).toEqual([['2', 'Two'], ['1', 'One'], ['3', 'Three']]);
        });
      });

      describe('when the field is a date time control', () => {
        describe('when the field has values', () => {
          it('assigns the date and time fields to the given date', () => {
            let testField = {
              'default_value': 'Wed Jul 11 2018 07:30:00',
              'type': 'DialogFieldDateTimeControl',
            };

            let newField = dialogData.setupField(testField);
            expect(newField.default_value.getFullYear()).toEqual(2018);
            expect(newField.default_value.getMonth()).toEqual(6);
            expect(newField.default_value.getDate()).toEqual(11);
            expect(newField.default_value.getHours()).toEqual(7);
            expect(newField.default_value.getMinutes()).toEqual(30);
          });
        });

        describe('when the field does not have values', () => {
          it('assigns the date and time fields to a new date', () => {
            let testField = {
              'values': null,
              'type': 'DialogFieldDateTimeControl',
            };
            let comparisonDate = new Date();

            let newField = dialogData.setupField(testField);
            expect(newField.default_value.getMonth()).toEqual(comparisonDate.getMonth());
            expect(newField.default_value.getDate()).toEqual(comparisonDate.getDate());
            expect(newField.default_value.getFullYear()).toEqual(comparisonDate.getFullYear());
            expect(newField.default_value.getHours()).toEqual(comparisonDate.getHours());
            expect(newField.default_value.getMinutes()).toEqual(comparisonDate.getMinutes());
          });
        });
      });
    });
  });

  describe('#validateField', () => {
    let testField;

    describe('when the field is required', () => {
      describe('when the field is a tag control', () => {
        describe('when the field forces a single value', () => {
          describe('when the field value is 0 (the "choose" option)', () => {
            beforeEach(() => {
              testField = {
                'type': 'DialogFieldTagControl',
                'default_value': 0,
                'required': true,
                'options': {
                  'force_single_value': true
                }
              };
            });

            it('does not pass validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(false);
              expect(validation.message).toEqual('This field is required');
            });
          });

          describe('when the field value is null', () => {
            beforeEach(() => {
              testField = {
                'type': 'DialogFieldTagControl',
                'default_value': null,
                'required': true,
                'options': {
                  'force_single_value': true
                }
              };
            });

            it('does not pass validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(false);
              expect(validation.message).toEqual('This field is required');
            });
          });

          describe('when the field value is any other number', () => {
            beforeEach(() => {
              testField = {
                'type': 'DialogFieldTagControl',
                'default_value': 1234,
                'required': true,
                'options': {
                  'force_single_value': true
                }
              };
            });

            it('passes validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(true);
              expect(validation.message).toEqual('');
            });
          });
        });

        describe('when the field does not force a single value', () => {
          describe('when the field value is empty', () => {
            beforeEach(() => {
              testField = {
                'type': 'DialogFieldTagControl',
                'default_value': [],
                'required': true,
                'options': {
                  'force_single_value': false
                }
              };
            });

            it('does not pass validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(false);
              expect(validation.message).toEqual('This field is required');
            });
          });

          describe('when the field value is null', () => {
            beforeEach(() => {
              testField = {
                'type': 'DialogFieldTagControl',
                'default_value': null,
                'required': true,
                'options': {
                  'force_single_value': false
                }
              };
            });

            it('does not pass validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(false);
              expect(validation.message).toEqual('This field is required');
            });
          });

          describe('when the field value has selected values', () => {
            beforeEach(() => {
              testField = {
                'type': 'DialogFieldTagControl',
                'default_value': [1234],
                'required': true,
                'options': {
                  'force_single_value': false
                }
              };
            });

            it('passes validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(true);
              expect(validation.message).toEqual('');
            });
          });
        });
      });

      describe('when the field is a text box', () => {
        describe('when the data type is an integer', () => {
          describe('when the field has an integer value', () => {
            beforeEach(() => {
              testField = {
                type: 'DialogFieldTextBox',
                required: true,
                data_type: 'integer',
                default_value: 3
              };
            });

            it('passes validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(true);
              expect(validation.message).toEqual('');
            });
          });

          describe('when the field has a null value', () => {
            beforeEach(() => {
              testField = {
                type: 'DialogFieldTextBox',
                required: true,
                data_type: 'integer',
                default_value: null
              };
            });

            it('fails validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(false);
              expect(validation.message).toEqual('This field is required');
            });
          });

          describe('when the field has an undefined value', () => {
            beforeEach(() => {
              testField = {
                type: 'DialogFieldTextBox',
                required: true,
                data_type: 'integer',
                default_value: undefined
              };
            });

            it('fails validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(false);
              expect(validation.message).toEqual('This field is required');
            });
          });
        });

        describe('when the validator rule does not match the text', () => {
          beforeEach(() => {
            testField = {
              'type': 'DialogFieldTextBox',
              'default_value': '123',
              'required': true,
              'validator_type': 'regex',
              'validator_rule': '^1234',
            };
          });

          it('fails validation', () => {
            let validation = dialogData.validateField(testField, testField.default_value);
            expect(validation.isValid).toEqual(false);
            expect(validation.message).toEqual('Entered text should match the format: ^1234');
          });
        });

        describe('when the validator rule is present but the type is not regex', () => {
          beforeEach(() => {
            testField = {
              'type': 'DialogFieldTextBox',
              'default_value': '123',
              'required': true,
              'validator_type': 'f',
              'validator_rule': '^1234',
            };
          });

          it('passes validation', () => {
            let validation = dialogData.validateField(testField, testField.default_value);
            expect(validation.isValid).toEqual(true);
            expect(validation.message).toEqual('');
          });
        });
      });

      describe('when the field is a date time control', () => {
        describe('when the field does not have a date filled out', () => {
          beforeEach(() => {
            testField = {
              type: 'DialogFieldDateTimeControl',
              required: true,
            };
          });

          it('fails validation', () => {
            let validation = dialogData.validateField(testField, testField.default_value);
            expect(validation.isValid).toEqual(false);
            expect(validation.message).toEqual('Select a valid date');
          });
        });
      });

      describe('when the field is a drop down list', () => {
        describe('when the data type is an integer', () => {
          describe('when the field has an integer value', () => {
            beforeEach(() => {
              testField = {
                type: 'DialogFieldDropDownList',
                required: true,
                data_type: 'integer',
                default_value: 3
              };
            });

            it('passes validation', () => {
              let validation = dialogData.validateField(testField, testField.default_value);
              expect(validation.isValid).toEqual(true);
              expect(validation.message).toEqual('');
            });
          });
        });
      });
    });
  });

  describe('#setDefaultValue', () => {
    it('should allow a default value to be set', () => {
      let testField = dialogField;
      testField.default_value = 'test';
      let testDefault = dialogData.setDefaultValue(testField);
      expect(testDefault).toBe('test');
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
        label: 'Test Field',
        message: 'This field is required'
      };
      const validation = dialogData.validateField(testDropDown, '');
      expect(validation).toEqual(jasmine.objectContaining(validateFailure));
    });

    describe('when the data type is a check box', () => {
      let testField = {
        default_value: 'f',
        name: 'test',
        type: 'DialogFieldCheckBox'
      }

      describe('when the field is dynamic', () => {
        beforeEach(() => {
          testField['dynamic'] = true;
        });

        it('ensures the field\'s default value stays set', () => {
          let testDefault = dialogData.setDefaultValue(testField);
          expect(testDefault).toBe('f');
        });
      });

      describe('when the field is not dynamic', () => {
        beforeEach(() => {
          testField['dynamic'] = false;
        });

        it('ensures the checkbox uses the default value that is set', () => {
          let testDefault = dialogData.setDefaultValue(testField);
          expect(testDefault).toBe('f');
        });
      });
    });

    describe('when the data type is a date control', () => {
      let dateField = {'type': 'DialogFieldDateControl',
                       'default_value': ''};

      describe('when the values are undefined', () => {
        beforeEach(() => {
          dateField.default_value = undefined;
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
          dateField.default_value = '2017-09-18';
        });

        it('returns a new date based on the values', () => {
          expect(dialogData.setDefaultValue(dateField)).toEqual(new Date('2017-09-18'));
        });
      });
    });
  });

  describe('#outputConversion', () => {
    beforeEach(() => {
      const configuredField = dialogData.setupField({
        name: 'date_1',
        type: 'DialogFieldDateControl',
        default_value: '2019-10-15',
      });

      dialogData.data = {
        fields: {
          [configuredField.name]: configuredField,
        },
        values: {
          [configuredField.name]: configuredField.default_value,
        },
      };
    });

    it('converts Dates to string', () => {
      let input = dialogData.data.values;
      let output = dialogData.outputConversion(input);

      expect(input === output).toBe(false); // shallow copy
      expect(typeof input.date_1).toEqual('object'); // Date
      expect(typeof output.date_1).toEqual('string');
      expect(output.date_1).toMatch(/^\d+-\d+-\d+$/); // YYYY-MM-DD
    });

    // this test requires the "local timezone" to be UTC+1 or more
    // timezone-mock is not compatible with current karma it seems:
    // ERROR [karma]: { inspect: [Function: inspect] }
    xit('preserves local timezone', () => {
      let input = dialogData.data.values;
      input.default_value = new Date('2019-10-15T00:11:22+01:00');

      let output = dialogData.outputConversion(input);

      expect(input.date_1.getUTCDate()).toEqual(14); // UTC is off by one
      expect(output.date_1).toEqual('2019-10-15'); // not 2019-10-14
    });
  });

  describe('#updateFieldSortOrder', () => {
    it('should allow a select list to be sorted', () => {
      const testDropDown = {
        values: [
          [1, 'Test'],
          [5, 'Test2'],
          [2, 'Test5']
        ],
        options: { sort_by: 'value', sort_order: 'descending', data_type: 'integer' }
      };
      const testSorted = dialogData.updateFieldSortOrder(testDropDown);
      const expectedResult = [[5, 'Test2'], [2, 'Test5'], [1, 'Test']];
      expect(testSorted).toEqual(expectedResult);
      const testDropDownDescription = {
        values: [
          [1, 'B'],
          [5, 'C'],
          [2, 'A']
        ],
        options: { sort_by: 'description', sort_order: 'descending' }
      };
      const testSortedDescription = dialogData.updateFieldSortOrder(testDropDownDescription);
      const expectedSortedResult = [[5, 'C'], [1, 'B'], [2, 'A']];
      expect(testSortedDescription).toEqual(expectedSortedResult);
    });

    it('should allow a numeric Description field to be sorted in a dropdown', () => {
      const testDropDownDescription = {
        values: [
          ['zero', '1'],
          ['five', '5'],
          ['two', '2']
        ],
        options: { sort_by: 'description', sort_order: 'descending' }
      };
      const testSortedDescription = dialogData.updateFieldSortOrder(testDropDownDescription);
      const expectedSortedResult = [['five', '5'], ['two', '2'], ['zero', '1']];
      expect(testSortedDescription).toEqual(expectedSortedResult);
    });
  });
});
