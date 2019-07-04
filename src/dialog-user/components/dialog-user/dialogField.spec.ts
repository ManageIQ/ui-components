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
  'fieldBeingRefreshed': false,
  'type': 'DialogFieldTextBox',
  'resource_action': {
    'resource_type': 'DialogField',
    'ae_attributes': {}
  }
};

describe('Dialog field test', () => {
  let bindings;

  describe('controller', () => {
    let dialogCtrl;

    beforeEach(() => {
      bindings = {
        field: {...dialogField},
        onUpdate: () => true,
        inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogField', null, bindings);
        dialogCtrl.$onInit();
      });
    });

    it('should have some default properties set', () => {
      expect(dialogCtrl.validation.isValid).toBeDefined();
      expect(dialogCtrl.dialogField.fieldBeingRefreshed).toBe(false);
      expect(dialogCtrl.validation.message).toBeDefined();
    });

    it('should allow a field to be validated', () => {
      dialogCtrl.dialogField.default_value = 'Test';
      const fieldValid = dialogCtrl.validateField();
      const expectedValue = {
        isValid: false,
        field: 'Service Name',
        message: 'Entered text should match the format: [0-9]'
      };

      expect(fieldValid).toEqual(expectedValue);
    });

    it('should check and update a field when the parent component field has changed', () => {
      dialogCtrl.field.default_value = 'Testing';
      dialogCtrl.$doCheck();
      expect(dialogCtrl.clonedDialogField.default_value).toBe('Testing');
    });

    it('converts a string of default values to an array', () => {
      dialogCtrl.field = {
        ...dialogField,
        type: 'DialogFieldDropDownList',
        default_value: '["one", "two"]',
        values: [
          ['val', 'label'],
        ],
        options: {
          ...dialogField.options,
          force_multi_value: true,
        },
      };
      dialogCtrl.$doCheck();
      expect(dialogCtrl.dialogField.default_value).toEqual(['one', 'two']);
    });
  });

  describe('updates should be reported up to function that is passed into component', () => {
    let bindings;
    let dialogCtrl;

    it('should report back information when a field gets updated', () => {
      bindings = {
        field: dialogField,
        onUpdate: jasmine.createSpy('onUpdate', (dialogFieldName: any, value: any) => true),
        inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogField', null, bindings);
        dialogCtrl.$onInit();
      });
      dialogCtrl.changesHappened();
      expect(dialogCtrl.onUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#dateTimeFieldChanged', () => {
    let bindings;
    let dialogCtrl;
    let testDate = new Date(2018, 6, 11, 7, 30);
    const dateTimeDialogField = {
      'name': 'dateTest',
      'type': 'DialogFieldDateTimeControl',
      'dateField': testDate,
      'timeField': testDate,
      'options': {},
    };

    it('calls onUpdate with the correct full date', () => {
      bindings = {
        field: dateTimeDialogField,
        onUpdate: jasmine.createSpy('onUpdate', (dialogFieldName: any, value: any) => true),
        inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogField', null, bindings);
        dialogCtrl.$onInit();
      });

      dialogCtrl.dateTimeFieldChanged();
      expect(dialogCtrl.onUpdate.calls.mostRecent().args[0].dialogFieldName).toEqual('dateTest');
      expect(dialogCtrl.onUpdate.calls.mostRecent().args[0].value).toEqual(testDate);
    });
  });
});
