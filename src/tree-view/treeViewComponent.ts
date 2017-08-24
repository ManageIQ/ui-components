import * as ng from 'angular';

export class TreeViewController {
  private tree;

  public name : string;
  public data;
  public selected;
  public reselect;
  public onSelect: (args: {node: any}) => void;
  public lazyLoad: (args: {node: any}) => Promise<any>;

  /*@ngInject*/
  constructor(private $element : ng.IRootElementService, private $timeout : ng.ITimeoutService) {}

  public $onInit() {
    let element = this.$element[0].querySelector('div.treeview');
    this.renderTree(element).then(() => {
      this.tree = ng.element(element).treeview(true);

      this.tree.getNodes().forEach((node) => {
        // Initial node selection right after rendering
        if (this.selected && this.matchNode(node, this.selected)) {
          this.selectNode(node);
        }

        if (this.getTreeState(node) === !node.state.expanded) {
          this.tree.revealNode(node, {silent: true});
          this.tree.toggleNodeExpanded(node);
        }
      });
    });
  }

  public $onChanges(changes) {
    // Prevent initial node selection before the tree is fully rendered
    if (!changes.selected.isFirstChange() &&
        changes.selected.previousValue !== undefined &&
        changes.selected.currentValue !== undefined) {
      let node = this.findNode(changes.selected.currentValue);
      this.$timeout(() => this.selectNode(node));
    }
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
        onNodeSelected:  (_event, node) => this.$timeout(() => this.onSelect({node: node})),
        lazyLoad:        (node, render) => this.$timeout(() => this.lazyLoad({node: node}).then(render)),
        onRendered:      () => this.$timeout(resolve)
      });
    });
  }

  private findNode(params) {
    return this.tree.getNodes().find(node => this.matchNode(node, params));
  }

  private matchNode(node, params) {
    return Object.keys(params)
      .map(param => node[param] === params[param])
      .every(bool => bool);
  }

  private selectNode(node) {
    this.tree.revealNode(node, {silent: true});
    this.tree.selectNode(node, {silent: true});
    this.tree.expandNode(node);
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
    data: '<',
    selected: '<',
    reselect: '<',
    onSelect: '&',
    lazyLoad: '&'
  };
}
