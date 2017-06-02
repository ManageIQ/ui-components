import {ITopology} from '../interfaces/topology';
import * as ng from 'angular';

export default class TopologyGraphService {
  /*@ngInject*/
  constructor(private $http: any, private MiQEndpointsService: any) {}

  /**
   *
   * @param url
   * @returns {ng.IPromise<Array<ITopology>>}
   */
  public httpGet(url: string): ng.IPromise<Array<ITopology>> {
    return this.$http.get(url)
      .then(dataResponse => dataResponse.data);
  }

  public loadIcons(icons: any): any {
    // Create a single temporary <i> element for fonticons
    let tmp = document.createElement('i');
    tmp.className = 'hidden';
    document.body.appendChild(tmp);

    let promises = [];

    // Iterate through all icons
    Object.keys(icons).map(key => icons[key]).map((icon) => {
      if (icon.type === 'fonticon') {
        tmp.className = 'hidden ' + icon.class;
        icon.char = window.getComputedStyle(tmp, ':before').content.replace(/'|"/g, '');
        icon.font = window.getComputedStyle(tmp, ':before').fontFamily;
      } else if (icon.type === 'fileicon') {
        promises.push(new Promise((resolve, reject) => {
          icon.img = new Image;
          icon.img.src = icon.path;
          icon.img.onload = () => resolve();
        }));
      }
      return icon;
    });

    // Remove the temporary <i> element
    tmp.remove();

    return Promise.all(promises);
  }

  public restartSimulation(simulation, nodes, links) {
    simulation.nodes(nodes);
    simulation.force('link').links(links);
    simulation.alpha(1).restart();
  }

  public findNode(sim, trans, r, x, y) {
    let point = trans.invert([x, y]);
    let node = sim.find(...point, r);
    return node ? sim.find(...point, node.size) : undefined;
  }
}
