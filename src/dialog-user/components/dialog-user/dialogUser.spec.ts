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
    it('should allow properties on a dialog field to be updated', () => {
        const testChanges = {
            data_type: 'string',
            read_only: true,
            required: true,
            visible: true
        };
        const dialogName = 'service_name';
        dialogCtrl.updateDialogFieldData(dialogName, testChanges);
        expect(dialogCtrl.dialogFields[dialogName].read_only).toBe(true);
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
        callback: function(value) { }
      };
      spyOn(refreshField, 'callback');
      let bindings = {
        dialog: dialogData,
        refreshField: refreshField,
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
      let testPromise = new Promise((resolve, reject) => {});
      expect(dialogCtrl.refreshSingleField('service_name')).toEqual(testPromise);
    });

    it('makes the callback to refreshField', () => {
      let promise = dialogCtrl.refreshSingleField('service_name');
      promise.then(() => {
        expect(refreshField.callback).toHaveBeenCalledWith({field: dialogData['service_name']});
      });
    });
  });
});
