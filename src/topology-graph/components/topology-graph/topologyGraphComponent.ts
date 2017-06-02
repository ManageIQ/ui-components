import TopologyGraphService from '../../services/topologyGraphService';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as Rx from 'rx-angular';

/**
 * Controller for topology graph component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name TopologyGraphController
 */
export class TopologyGraphController {
  /*@ngInject*/
  constructor(private MiQTopologyGraphService: TopologyGraphService, private $element, private $scope) {}

  public filters = [];
  public url : string;
  public tooltip : any;
  public menu : any;

  private canvas: any;
  private canvasW: number;
  private canvasH: number;
  private canvasX: number;
  private canvasY: number;
  private context: any;

  private nodes: Array<any>;
  private links: Array<any>;
  private icons: any;
  private maxNodeSize: number;

  private transform: any;
  private simulation: any;

  public addFilter(filter: any) {
    this.filters.push(filter);
  }

  public toggleFilter(filter: any) {
    filter.active = !filter.active;
    // Fetch a list of node types that should be hidden
    let toHide = _.filter(this.filters, (f) => f.active).map((f) => f.type);
    // Filter out the nodes that shouldn't be displayed
    let nodes = _.filter(this.nodes, (node) => !toHide.includes(node.type));
    // Filter out the links that are connected to hidden nodes
    let links = _.filter(this.links, (link) => nodes.includes(link.source) && nodes.includes(link.target));
    // Restart the simulation
    this.MiQTopologyGraphService.restartSimulation(this.simulation, nodes, links);
  }

  public tooltipStyle() {
    if (this.tooltip) {
      return {
        left: `${this.transform.applyX(this.tooltip.x) + this.tooltip.size + this.canvasX}px`,
        top: `${this.transform.applyY(this.tooltip.y) - 12 + this.canvasY}px`
      };
    }
  }

  public menuStyle() {
    if (this.menu) {
      return {
        left: `${this.transform.applyX(this.menu.x) + this.canvasX}px`,
        top: `${this.transform.applyY(this.menu.y) + this.canvasY}px`
      };
    }
  }

  public $onInit() {
    this.canvas = this.$element[0].querySelector('.miq-topology-graph canvas.topology-graph');
    // Store the CSS computed width and the height of the canvas
    this.canvasW = this.canvas.clientWidth;
    this.canvasH = this.canvas.clientHeight;
    // We need to set to override the default canvas dimensions
    this.canvas.width = this.canvasW;
    this.canvas.height = this.canvasH;
    // Store the canvas' base coordinates
    const coords = this.canvas.getBoundingClientRect();
    this.canvasX = coords.left;
    this.canvasY = coords.top;
    // Store the canvas' context
    this.context = this.canvas.getContext('2d');
    // Set up the initial transform
    this.transform = d3.zoomIdentity;
    // Create the force simulation
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.id))
      .force('collision', d3.forceCollide((d) => d.size || 17))
      .force('charge', d3.forceManyBody().strength(() => -200))
      .force('center', d3.forceCenter(this.canvasW / 2, this.canvasH / 2));

    // Fetch the data from the server
    this.MiQTopologyGraphService.httpGet(this.url).then(d => this.fetchData(d)).then(() => {
      this.simulation.nodes(this.nodes).on('tick', () => this.forceTick());

      this.simulation.force('link').links(this.links);

      // Set up dragging
      d3.select(this.canvas).call(
        d3.drag().container(this.canvas)
          .subject(() => this.findNode(d3.event.x, d3.event.y))
          .on('start', () => this.onDragStart())
          .on('drag', () => this.onDrag())
          .on('end', () => this.onDragEnd())
      );

      // Set up pan & zoom
      d3.select(this.canvas).call(
        d3.zoom()
        .translateExtent([[0, 0], [this.canvasW, this.canvasH]])
        .scaleExtent([1, 8])
        .on('zoom', this.onZoom.bind(this))
      );

      // Set up tooltips
      d3.select(this.canvas).on('mousemove', () => {
        this.tooltip = this.findNode(d3.event.x - this.canvasX, d3.event.y - this.canvasY);
        this.$scope.$apply();
      });

      // Set up context menu
      d3.select(this.canvas).on('contextmenu', () => {
        d3.event.preventDefault();
        // Items have an explicit false for disabled context menu
        if (this.tooltip.menu !== false) {
          this.menu = this.menu ? undefined : this.tooltip;
          this.$scope.$apply();
        }
      });
      d3.select(this.canvas).on('click', () => {
        this.menu = undefined;
        this.$scope.$apply();
      });
    });
  }

  private fetchData(data : any) {
    this.nodes = data.nodes;
    this.links = data.links;
    this.icons = data.icons;
    this.maxNodeSize = Math.max(...this.nodes.map(d => d.size || 17));
    return this.MiQTopologyGraphService.loadIcons(this.icons);
  }

  private normalizeNode(node: any) {
    node.size = node.size || 17;
    node.x = Math.max(node.size + 1, Math.min(this.canvasW - node.size - 1, node.x));
    node.y = Math.max(node.size + 1, Math.min(this.canvasH - node.size - 1, node.y));
  }

  private drawNode(node: any) {
    this.context.beginPath();
    // Create the circle
    this.context.arc(...this.transform.apply([node.x, node.y]), node.size, 0, 2 * Math.PI);
    this.context.fillStyle = '#FFFFFF';
    this.context.strokeStyle = '#000000';
    this.context.fill();
    this.context.stroke();

    const icon = this.icons[node.icon];
    const imgR = node.size * 0.7;
    const coords = this.transform.apply([node.x, node.y]);

    // Draw the fonticon/fileicon
    if (icon.char && icon.font) {
      this.context.fillStyle = '#000000';
      this.context.font = `${2 * imgR}px ${icon.font}`;
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText(icon.char, ...coords);
    } else if (icon.img) {
      this.context.drawImage(icon.img, ...coords.map((r) => r - imgR), 2 * imgR, 2 * imgR);
    }
  }

  private drawLink(link: any) {
    this.context.beginPath();
    this.context.moveTo(...this.transform.apply([link.source.x, link.source.y]));
    this.context.lineTo(...this.transform.apply([link.target.x, link.target.y]));
    this.context.strokeStyle = 'rgba(150, 150, 150, 0.6)';
    this.context.stroke();
  }

  private drawMinimap() {
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    this.context.fillStyle = 'rgba(252, 252, 252, 0.3)';
    let mapX = 0.9 * this.canvasW - 10,
        mapY = 10,
        mapW = 0.1 * this.canvasW,
        mapH = 0.1 * this.canvasH;

    this.context.rect(mapX, mapY, mapW, mapH);
    this.context.stroke();
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = 'rgba(224, 224, 224, 0.3)';
    this.context.rect(
      mapX - this.transform.x / this.transform.k * 0.1,
      mapY - this.transform.y / this.transform.k * 0.1,
      mapW / this.transform.k,
      mapH / this.transform.k
     );
    this.context.stroke();
    this.context.fill();
  }

  private forceTick() {
    let nodes = this.simulation.nodes();
    let links = this.simulation.force('link').links();

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvasW, this.canvasH);
    // Keep the nodes inside the bounding box
    nodes.forEach(this.normalizeNode.bind(this));
    // Draw the links
    links.forEach(this.drawLink.bind(this));
    // Draw the nodes
    nodes.forEach(this.drawNode.bind(this));

    // Draw the minimap if zooming
    if (this.transform.k !== 1) {
      this.drawMinimap();
    }
  }

  private findNode(x, y) {
    const point = this.transform.invert([x, y]);
    const node = this.simulation.find(...point, this.maxNodeSize);
    return node ? this.simulation.find(...point, node.size) : undefined;
  }

  private onDragStart() {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
    // Mark the dragged item
    d3.event.subject.dragStart = true;
    this.tooltip = undefined;
    this.menu = undefined;
    this.$scope.$apply();
  }

  private onDrag() {
    // We need to operate with delta values as the canvas might be paned and/or zoomed
    d3.event.subject.fx += d3.event.dx / this.transform.k;
    d3.event.subject.fy += d3.event.dy / this.transform.k;
    // Unmark the dragged item
    d3.event.subject.dragStart = false;
  }

  private onDragEnd() {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0);
    }
    // If the dragged item is marked, unpin its position
    if (d3.event.subject.dragStart) {
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }
    // Reset the dragged item's marking
    delete d3.event.subject.dragStart;
  }

  private onZoom() {
    if (d3.event !== null) {
      this.transform = d3.event.transform;
    }
    this.tooltip = undefined;
    this.menu = undefined;
    this.$scope.$apply();
    this.simulation.on('tick')();
  }
}

export default class TopologyGraph implements ng.IComponentOptions {
  public controller = TopologyGraphController;
  public template = require('./topology-graph.html');
  public transclude = true;
  public bindings: any = {
    url: '@',
  };
}
