import { AbstractModal, ModalController } from '../abstractModal';

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name dialogEditorModalBox
 * @description
 *    Component contains templates for the modal for editing dialog editors
 *    box (group) details
 * @example
 * <dialog-editor-modal-box></dialog-editor-modal-box>
 */
export default class ModalBoxTemplate extends AbstractModal {
  public template = require('./box.html');
  public controller = ModalBoxController;
}

class ModalBoxController extends ModalController {
  public modalData: any;
  public validation: any;

  public modalBoxIsValid() {
    return this.validation.validateGroup(this.modalData, true);
  }
}
