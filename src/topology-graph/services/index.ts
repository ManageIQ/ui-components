import TopologyGraphService from './topologyGraphService';

export default (module: ng.IModule) => {
  module.service('MiQTopologyGraphService', TopologyGraphService);
};
