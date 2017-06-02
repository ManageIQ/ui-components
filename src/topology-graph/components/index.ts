import TopologyGraph from './topology-graph';
import TopologyFilter from './topology-filter';
import * as angular from 'angular';

export default (module: ng.IModule) => {
  TopologyGraph(module);
  TopologyFilter(module);
};
