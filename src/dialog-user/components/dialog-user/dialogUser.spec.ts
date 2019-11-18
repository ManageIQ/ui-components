describe('Dialog test', () =>  {
  let bindings;
  const dialogFile = require('../../../../demo/data/dialog-data.json');
  const dialog = dialogFile.resources[0].content[0];

  describe('controller', () => {
    let dialogCtrl;

    beforeEach(() => {
      bindings = {
      dialog: dialog,
      refreshField: () => true,
      onUpdate: () => true,
      inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogUser', null, bindings);
        dialogCtrl.$onInit();
      });
    });
    it('should have some values set', () => {
        const expectedDialogs = ['option_1_cores_per_socket', 'option_1_vm_memory',
                                 'option_1_vm_name', 'service_name', 'tag_0_environment', 'tag_1_function'];
        const actualDialogs = Object.keys(dialogCtrl.dialogFields).sort();
        expect(expectedDialogs).toEqual(actualDialogs);
    });
    it('should allow a dialog fields value to be updated', () => {
        dialogCtrl.updateDialogField('service_name', 'Test');
        expect(dialogCtrl.dialogValues['service_name']).toBe('Test');
    });
    it('does not attempt to alter the default value of a stored dialog field', () => {
        expect(dialogCtrl.dialogFields['service_name'].default_value).toBe('service_default');
        dialogCtrl.updateDialogField('service_name', 'Test');
        expect(dialogCtrl.dialogFields['service_name'].default_value).toBe('service_default');
    });
    it('should allow properties on a dialog field to be updated', () => {
      const testChanges = {
        data_type: 'string',
        read_only: true,
        required: true,
        visible: true,
        validator_rule: '^1234',
      };
      const dialogName = 'service_name';
      dialogCtrl.updateDialogFieldData(dialogName, testChanges);
      expect(dialogCtrl.dialogFields[dialogName].read_only).toBe(true);
      expect(dialogCtrl.dialogFields[dialogName].validator_rule).toBe('^1234');
    });
  });
  describe('controller with refreshable fields', () => {
    let dialogCtrl;
    const dialogRefreshFile = require('../../../../demo/data/dialog-data-refresh.json');
    const dialogData = dialogRefreshFile.resources[0].content[0];

    beforeEach(() => {
      bindings = {
      dialog: dialogData,
      refreshField: () => true,
      onUpdate: () => true,
      inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController => {
        dialogCtrl = $componentController('dialogUser', null, bindings);
        dialogCtrl.$onInit();
      });
    });

    it('sets up the field associations', () => {
        expect(dialogCtrl.fieldAssociations['option_1_vm_name']).toEqual(['tag_1_function']);
    });
  });

  describe('#refreshSingleField', () => {
    let dialogCtrl;
    let refreshField;
    const dialogRefreshFile = require('../../../../demo/data/dialog-data-refresh.json');
    const dialogData = dialogRefreshFile.resources[0].content[0];

    beforeEach(() => {
      refreshField = {
        callback: (value) => Promise.resolve({}),
      };
      spyOn(refreshField, 'callback').and.callThrough();

      let bindings = {
        dialog: dialogData,
        refreshField: refreshField.callback,
        onUpdate: () => true,
        inputDisabled: false
      };
      angular.mock.module('miqStaticAssets.dialogUser');
      angular.mock.inject($componentController =>  {
        dialogCtrl = $componentController('dialogUser', null, bindings);
        dialogCtrl.$onInit();
      });
    });

    it('returns a promise', () => {
      expect(dialogCtrl.refreshSingleField('service_name').then).toBeDefined();
    });

    it('makes the callback to refreshField', (done) => {
      let expectedField =  _.pick(dialogCtrl.dialogFields['service_name'], [
        'created_at',
        'href',
        'name',
      ]);

      dialogCtrl.refreshSingleField('service_name').then(() => {
        expect(refreshField.callback).toHaveBeenCalledWith({
          field: jasmine.objectContaining(expectedField),
        });

        done();
      });
    });
  });

  describe('#refreshFieldCallback', () => {
    let dialogCtrl;

    const dialogRefreshFile = require('../../../../demo/data/dialog-data-refresh.json');
    const oldDialogData = dialogRefreshFile.resources[0].content[0];

    describe('when the dialog data is for a drop down list', () => {
      const newDialogData = {
        data_type: 'new data_type',
        options: 'new options',
        read_only: 'new read_only',
        required: true,
        visible: false,
        values: 'new values',
        default_value: 'new default_value',
        type: 'DialogFieldDropDownList'
      };

      beforeEach(() => {
        bindings = {
          dialog: oldDialogData,
          refreshField: () => true,
          onUpdate: () => true,
          inputDisabled: false
        };

        angular.mock.module('miqStaticAssets.dialogUser');
        angular.mock.inject($componentController =>  {
          dialogCtrl = $componentController('dialogUser', null, bindings);
          dialogCtrl.$onInit();
        });

        dialogCtrl.refreshFieldCallback('service_name', newDialogData);
      });

      it('updates the field value', () => {
        expect(dialogCtrl.dialogValues['service_name']).toBe('new default_value');
      });
    });

    describe('when the dialog data is for a radio button', () => {
      const newDialogData = {
        data_type: 'new data_type',
        options: 'new options',
        read_only: 'new read_only',
        required: true,
        visible: false,
        values: 'new values',
        default_value: 'new default_value',
        type: 'DialogFieldRadioButton'
      };

      beforeEach(() => {
        bindings = {
          dialog: oldDialogData,
          refreshField: () => true,
          onUpdate: () => true,
          inputDisabled: false
        };

        angular.mock.module('miqStaticAssets.dialogUser');
        angular.mock.inject($componentController =>  {
          dialogCtrl = $componentController('dialogUser', null, bindings);
          dialogCtrl.$onInit();
        });

        dialogCtrl.refreshFieldCallback('service_name', newDialogData);
      });

      it('updates the field value', () => {
        expect(dialogCtrl.dialogValues['service_name']).toBe('new default_value');
      });
    });

    describe('when the dialog data is for a tag control', () => {
      const newDialogData = {
        data_type: 'new data_type',
        options: 'new options',
        read_only: 'new read_only',
        required: true,
        visible: false,
        values: 'new values',
        default_value: 'new default_value',
        type: 'DialogFieldTagControl'
      };

      beforeEach(() => {
        bindings = {
          dialog: oldDialogData,
          refreshField: () => true,
          onUpdate: () => true,
          inputDisabled: false
        };

        angular.mock.module('miqStaticAssets.dialogUser');
        angular.mock.inject($componentController =>  {
          dialogCtrl = $componentController('dialogUser', null, bindings);
          dialogCtrl.$onInit();
        });

        dialogCtrl.refreshFieldCallback('service_name', newDialogData);
      });

      it('updates the field value', () => {
        expect(dialogCtrl.dialogValues['service_name']).toBe('new default_value');
      });
    });

    describe('when the dialog data field type is not a sorted item type', () => {
      const newDialogData = {
        data_type: 'new data_type',
        default_value: 'new default_value',
        options: 'new options',
        read_only: 'new read_only',
        required: true,
        validator_rule: 'new validator_rule',
        validator_type: 'new validator_type',
        visible: false,
      };

      beforeEach(() => {
        bindings = {
          dialog: oldDialogData,
          refreshField: () => true,
          onUpdate: () => true,
          inputDisabled: false
        };

        angular.mock.module('miqStaticAssets.dialogUser');
        angular.mock.inject($componentController =>  {
          dialogCtrl = $componentController('dialogUser', null, bindings);
          dialogCtrl.$onInit();
        });

        dialogCtrl.refreshFieldCallback('service_name', newDialogData);
      });

      it('updates the field value', () => {
        expect(dialogCtrl.dialogValues['service_name']).toBe('new default_value');
      });

      it('updates properties of the field', () => {
        expect(dialogCtrl.dialogFields['service_name'].data_type).toBe('new data_type');
        expect(dialogCtrl.dialogFields['service_name'].default_value).toBe('new default_value');
        expect(dialogCtrl.dialogFields['service_name'].options).toBe('new options');
        expect(dialogCtrl.dialogFields['service_name'].read_only).toBe('new read_only');
        expect(dialogCtrl.dialogFields['service_name'].required).toBe(true);
        expect(dialogCtrl.dialogFields['service_name'].validator_rule).toBe('new validator_rule');
        expect(dialogCtrl.dialogFields['service_name'].validator_type).toBe('new validator_type');
        expect(dialogCtrl.dialogFields['service_name'].visible).toBe(false);
      });
    });
  });
});
