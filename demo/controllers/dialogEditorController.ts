import DialogEditorService from '../../src/dialog-editor/services/dialogEditorService';
import {ComponentDemo} from '../services/availableComponentBuilder';
@ComponentDemo({
  name: 'editor',
  title: 'Dialog editor',
  template: require('./../views/dialog/editor.html'),
  group: 'dialog',
  controller: 'demoDialogEditor as vm'
})
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
