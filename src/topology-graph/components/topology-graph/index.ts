import TopologyGraph from './topologyGraphComponent';

export default (module: ng.IModule) => {
  module.component('miqTopologyGraph', new TopologyGraph);
};
