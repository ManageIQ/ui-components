import DialogEditorService from '../../src/dialog-editor/services/dialogEditorService';
export default class DialogEditorController {
  public dialog: any;
  /* @ngInject */
  constructor(private DialogEditor: DialogEditorService) {
    this.init({
      'content': [{
        'dialog_tabs': [{
          'label': 'New Tab',
          'position': 0,
          'dialog_groups': [{
            'label': 'New Section',
            'position': 0,
            'dialog_fields': []
          }],
        }],
      }],
    });
  }

  public init(dialog) {
    this.DialogEditor.setData(dialog);
    this.dialog = dialog;
  }
}
