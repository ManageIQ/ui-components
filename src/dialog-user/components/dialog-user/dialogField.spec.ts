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

describe('Dialog field test', () => {
  let bindings;
  describe('controller', () => {
    let dialogCtrl;

    beforeEach(() => {
      bindings = {
        field: dialogField,
        onUpdate: function () { },
        inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogField', null, bindings);
        dialogCtrl.$onInit();
      });
    });

    it('should have some default properties set', () => {
      expect(dialogCtrl.dialogField.fieldValidation).toBeDefined();
      expect(dialogCtrl.dialogField.fieldBeingRefreshed).toBe(false);
      expect(dialogCtrl.dialogField.errorMessage).toBeDefined();
    });

    it('should allow a field to be validated', () => {
      dialogCtrl.dialogField.default_value = 'Test';
      const fieldValid = dialogCtrl.validateField();
      const expectedValue = {
        isValid: false,
        field: 'Service Name',
        message: 'Entered text does not match required format.'
      };

      expect(fieldValid).toEqual(expectedValue);
    });

    it('should check and update a field when the parent component field has changed', () => {
      let testDialogUpdate = dialogField;
      testDialogUpdate.default_value = 'Testing';
      dialogCtrl.field = testDialogUpdate;
      dialogCtrl.$doCheck();
      expect(dialogCtrl.clonedDialogField.default_value).toBe('Testing');
    });
  });
  describe('updates should be reported up to function that is passed into component', () => {
    let bindings;
    let dialogCtrl;
    it('should report back information when a field gets updated', () => {
      bindings = {
        field: dialogField,
        onUpdate: jasmine.createSpy('onUpdate', (dialogFieldName: any, value: any) => { }),
        inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogField', null, bindings);
        dialogCtrl.$onInit();
      });
      dialogCtrl.changesHappened();
      expect(dialogCtrl.onUpdate).toHaveBeenCalledTimes(2);
    });
  });
});
