import DialogEditorService from './dialogEditorService';
import ModalService from './modal/modalService';

export default (module: ng.IModule) => {
  module.service('DialogEditor', DialogEditorService);
  module.service('DialogEditorModal', ModalService);
};
