import * as ng from 'angular';

export class DialogEditorController {
  public modalOptions: any;
  public elementInfo: any;
  public treeSelectorShow: boolean = false;
  public treeSelectorIncludeDomain: boolean = false;

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
  }

  public treeSelectorToggle() {
    this.treeSelectorShow = ! this.treeSelectorShow;
  }

  public treeSelectorSelect(node, elementData) {
    const fqname = node.fqname.split('/');
    if (this.treeSelectorIncludeDomain === false) {
      fqname.splice(1, 1);
    }
    elementData.resource_action = {
      ...elementData.resource_action,
      ae_instance: fqname.pop(),
      ae_class: fqname.pop(),
      ae_namespace: fqname.filter(String).join('/')
    };
    this.treeSelectorShow = false;
  }

  public showFullyQualifiedName(resourceAction) {
    if (resourceAction.ae_namespace && resourceAction.ae_class && resourceAction.ae_instance) {
      return `${resourceAction.ae_namespace}/${resourceAction.ae_class}/${resourceAction.ae_instance}`;
    } else {
      return '';
    }
  }
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditor
 * @description
 *    Top-level dialog editor component.
 * @example
 * <dialog-editor>
 * </dialog-editor>
 */

export default class DialogEditor implements ng.IComponentOptions {
  public controller = DialogEditorController;
  public template = require('./dialog-editor.html');
  public bindings = {
    treeSelectorData: '<',
    treeSelectorLazyLoad: '<'
  };
}
