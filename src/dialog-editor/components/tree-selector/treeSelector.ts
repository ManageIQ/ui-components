export default {
  template: require('./tree-selector.html'),
  bindings: {
    toggle: '&',
    data: '<',
    onSelect: '&',
    lazyLoad: '&',
    includeDomain: '=',
  },
};
