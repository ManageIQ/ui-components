import TopologyFilter from './topologyFilterComponent';

export default (module: ng.IModule) => {
  module.component('miqTopologyFilter', new TopologyFilter);
};
