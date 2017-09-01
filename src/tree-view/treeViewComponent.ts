import * as ng from 'angular';

export class TreeViewController {
  private tree;
  private element;
  private rendered : boolean = false;

  public name : string;
  public data;
  public selected;
  public reselect;
  public onSelect: (args: {node: any}) => void;
  public lazyLoad: (args: {node: any}) => Promise<any>;

  /*@ngInject*/
  constructor(private $element : ng.IRootElementService, private $timeout : ng.ITimeoutService) {}

  public $onChanges(changes) {
    // Render the tree after the data has been sent for the first time
    if (changes.data && !this.rendered && changes.data.currentValue !== undefined) {
      this.element = ng.element(this.$element[0].querySelector('div.treeview'));
      this.renderTree();
    }

    // Prevent initial node selection before the tree is fully rendered
    if (this.rendered && !changes.selected.isFirstChange() && changes.selected.currentValue !== undefined) {
      this.selectNode(changes.selected.currentValue);
    }
  }

  private renderTree() {
    new Promise((resolve) => {
      this.element.treeview({
        data:            this.data,
        showImage:       true,
        expandIcon:      'fa fa-fw fa-angle-right',
        collapseIcon:    'fa fa-fw fa-angle-down',
        loadingIcon:     'fa fa-fw fa-spinner fa-pulse',
        levels:          1,
        allowReselect:   this.reselect,
        preventUnselect: true,
        showBorders:     false,
        onNodeExpanded:  this.setTreeState(true),
        onNodeCollapsed: this.setTreeState(false),
        onNodeSelected:  (_event, node) => this.$timeout(() => this.onSelect({node: node})),
        lazyLoad:        (node, render) => this.$timeout(() => this.lazyLoad({node: node}).then(render)),
        onRendered:      () => this.$timeout(resolve)
      });
    }).then(() => {
      this.tree = this.element.treeview(true);

      // Initial node selection right after rendering
      if (this.selected) {
        this.selectNode(this.selected);
      }

      this.tree.getNodes().forEach((node) => {
        if (this.getTreeState(node) === !node.state.expanded) {
          this.tree.revealNode(node, {silent: true});
          this.tree.toggleNodeExpanded(node);
        }
      });

      this.rendered = true;
    });
  }

  private findNode(params) {
    return this.tree.getNodes().find(node => Object.keys(params)
      .map(param => node[param] === params[param])
      .every(bool => bool)
    );
  }

  /*
   * @function selectNode
   * @param [Object] or Object
   *
   * This function is able to select a node that is not loaded in the tree yet.
   * Simply provide an array of matchers instead of a single one. The matchers
   * should hierarchically follow the structure above the node to be selected.
   *
   * The matched nodes will be expanded and lazily loaded one by one until the
   * loop reaches the last node that will be simply selected instead.
   */

  private selectNode(select) {
    let head, tail;
    [head, tail] = TreeViewController.splitObject(select);

    // Iterate through the nodes to be lazily expanded
    tail.reduce((sum, value) => sum.then(() => new Promise((resolve, reject) => {
      let node = this.findNode(value);
      if (!node) { // Node not found, break the loop
        return reject();
      }
      // No need for this step if the tree isn't lazily loadable
      if (!node.lazyLoad) {
        return resolve();
      }

      // The event handler needs to be named for future deregistering
      let handler = (_event, exp) => {
        if (exp.nodeId === node.nodeId) {
          // Unregister itself after success
          this.element.unbind('nodeExpanded', handler);
          resolve();
        }
      };

      this.element.on('nodeExpanded', handler);
      this.tree.toggleNodeExpanded(node);
    })), new Promise(nope => nope())).then(() => this.selectFinalNode(head));
  }

  private static splitObject(obj) {
    let head = obj;
    if (Array.isArray(obj)) {
      head = obj.pop();
    } else {
      obj = [];
    }
    return [head, obj];
  }

  private selectFinalNode(obj) {
    let node = this.findNode(obj);
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
