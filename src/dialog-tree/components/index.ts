import dialogTreeWrapper from './dialog-tree-wrapper';
import dialogTreeItem from './dialog-tree-item';

export default (module: ng.IModule) => {
  dialogTreeWrapper(module);
  dialogTreeItem(module);
};
