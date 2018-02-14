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
  public modalOptions: any;
  public elementInfo: any;
  public visible: any;

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

  public setupModalOptions(type, tab, box, field) {
    const components = {
      tab: 'dialog-editor-modal-tab',
      box: 'dialog-editor-modal-box',
      field: 'dialog-editor-modal-field'
    };
    this.modalOptions = {
      component: components[type],
      size: 'lg',
    };
    this.elementInfo = { type: type, tabId: tab, boxId: box, fieldId: field };
    this.visible = true;
  }
}
