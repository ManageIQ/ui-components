import { TopologyGraphController } from '../topology-graph/topologyGraphComponent';
/**
 * Controller for topology graph filter component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name TopologyFilterController
 */
class TopologyFilterController {
  public TopologyGraphCtrl : TopologyGraphController;
  public icon: string;
  public type: string;

  public $onInit() {
    this.TopologyGraphCtrl.addFilter({
      icon: this.icon,
      type: this.type,
      active: false
    });
  }
}

export default class TopologyFilter implements ng.IComponentOptions {
  public controller = TopologyFilterController;
  public require: any = {
    TopologyGraphCtrl: '^miqTopologyGraph'
  };
  public bindings: any = {
    icon: '@',
    type: '@'
  };
}
