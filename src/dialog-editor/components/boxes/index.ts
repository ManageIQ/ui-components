import Boxes from './boxesComponent';

export default (module: ng.IModule) => {
  module.component('dialogEditorBoxes', new Boxes);
};
