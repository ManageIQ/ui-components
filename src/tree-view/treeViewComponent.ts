import * as ng from 'angular';

export class TreeViewController {
  public tree;
  public reselect;
  public data;
  public name : string;
  public onSelect: (args: {node: any}) => void;
  public lazyLoad: (args: {node: any}) => Promise<any>;

  /*@ngInject*/
  constructor(private $element : ng.IRootElementService) {}

  public $onInit() {
    let element = this.$element[0].querySelector('div.treeview');
    this.renderTree(element).then(() => {
      this.tree = ng.element(element).treeview(true);

      this.tree.getNodes().forEach((node) => {
        if (this.getTreeState(node) === !node.state.expanded) {
          this.tree.toggleNodeExpanded(node);
        }
      });
    });
  }

  private renderTree(element) {
    return new Promise((resolve) => {
      ng.element(element).treeview({
        data:            this.data,
        expandIcon:      'fa fa-fw fa-angle-right',
        collapseIcon:    'fa fa-fw fa-angle-down',
        loadingIcon:     'fa fa-fw fa-spinner fa-pulse',
        levels:          1,
        allowReselect:   this.reselect,
        showBorders:     false,
        onNodeExpanded:  this.setTreeState(true),
        onNodeCollapsed: this.setTreeState(false),
        onNodeSelected:  (_event, node) => this.onSelect({node: node}),
        lazyLoad:        (node, render) => this.lazyLoad({node: node}).then(render),
        onRendered:      () => resolve()
      });
    });
  }

  private setTreeState(state) {
    return (_event, node) => {
      let persist = JSON.parse(sessionStorage.getItem(`treeView-${this.name}`));
      // Initialize the session storage object
      if (!persist) {
        persist = {};
      }
      // Save the third argument as the new node state
      persist[node.key] = state;
      sessionStorage.setItem(`treeView-${this.name}`, JSON.stringify(persist));
    };
  }

  private getTreeState(node) {
    let persist = JSON.parse(sessionStorage.getItem(`treeView-${this.name}`));
    // Initialize the session storage object
    if (!persist) {
      persist = {};
    }
    return persist[node.key];
  }
}

export default class TreeView implements ng.IComponentOptions {
  public controller = TreeViewController;
  public template = '<div class="treeview treeview-pf-select"></div>';
  public bindings: any = {
    name: '@',
    data: '@',
    reselect: '@',
    onSelect: '&',
    lazyLoad: '&'
  };
}
