import tabList from './tab-list';
import box from './box';
import field from './field';
import toolbox from './toolbox';
import modal from './modal';
import modalFieldTemplate from './modal-field-template';

export default (module: ng.IModule) => {
  tabList(module);
  box(module);
  field(module);
  toolbox(module);
  modal(module);
  modalFieldTemplate(module);
};
