import tabList from './tab-list';
import box from './box';
import field from './field';
import toolbox from './toolbox';
import modal from './modal';
import modalTab from './modal-tab';
import modalBox from './modal-box';
import modalField from './modal-field';
import modalFieldTemplate from './modal-field-template';

export default (module: ng.IModule) => {
  tabList(module);
  box(module);
  field(module);
  toolbox(module);
  modal(module);
  modalTab(module);
  modalBox(module);
  modalField(module);
  modalFieldTemplate(module);
};
