import DialogEditor from './dialogEditorService';
import * as angular from 'angular';

describe('DialogEditor test', () => {
  let dialogEditor;

  beforeEach(() => {
    angular.mock.module('miqStaticAssets.dialogEditor');
    angular.mock.module('miqStaticAssets.common');
    angular.mock.inject(() => {
      dialogEditor = new DialogEditor();
    });
  });

  describe('#setData', () => {
    it('sets data to the data property', () => {
      dialogEditor.setData('test');
      expect(dialogEditor.data).toEqual('test');
    });
  });

  describe('#getDialogId', () => {
    let dialogData = {content: [{id: 123}]};

    beforeEach(() => {
      dialogEditor.setData(dialogData);
    });

    it('returns the id of the dialog', () => {
      expect(dialogEditor.getDialogId()).toEqual(123);
    });
  });

  describe('#getDialogLabel', () => {
    let dialogData = {content: [{label: 'label'}]};

    beforeEach(() => {
      dialogEditor.setData(dialogData);
    });

    it('returns the label of the dialog', () => {
      expect(dialogEditor.getDialogLabel()).toEqual('label');
    });
  });

  describe('#getDialogDescription', () => {
    let dialogData = {content: [{description: 'description'}]};

    beforeEach(() => {
      dialogEditor.setData(dialogData);
    });

    it('returns the description of the dialog', () => {
      expect(dialogEditor.getDialogDescription()).toEqual('description');
    });
  });

  describe('#getDialogTabs', () => {
    let dialogData = {content: [{dialog_tabs: 'dialog_tabs'}]};

    beforeEach(() => {
      dialogEditor.setData(dialogData);
    });

    it('returns the dialog_tabs of the dialog', () => {
      expect(dialogEditor.getDialogTabs()).toEqual('dialog_tabs');
    });
  });

  describe('#getDynamicFields', () => {
    let field1 = {
      id: 1,
      dynamic: true
    };

    let field2 = {
      id: 2,
      dynamic: true
    };

    let field3 = {
      id: 3,
      dynamic: false
    };

    let data = {
      content: [{
        dialog_tabs: [{
          dialog_groups: [{
            dialog_fields: [field1, field2, field3]
          }]
        }]
      }]
    };

    beforeEach(() => {
      dialogEditor.setData(data);
    });

    describe('when the list of dynamic field contains the given field id', () => {
      it('returns the dynamic fields without the given field', () => {
        expect(dialogEditor.getDynamicFields(2)).toEqual([field1]);
      });
    });

    describe('when the list of dynamic field does not contain the given field id', () => {
      it('returns the full list of dynamic fields', () => {
        expect(dialogEditor.getDynamicFields(4)).toEqual([field1, field2]);
      });
    });
  });
});
