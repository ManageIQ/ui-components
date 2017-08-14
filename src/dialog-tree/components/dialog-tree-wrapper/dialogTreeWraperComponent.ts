import * as ng from 'angular';
import * as _ from 'lodash';
import {__} from '../../../common/translateFunction';
require('patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js');

/**
 * Controller for the Dialog Editor box component
 * @memberof miqStaticAssets
 * @ngdoc controllertreeview
 * @name DialogTreeWrapper
 */
class DialogTreeWrapperController {

  // NOTE: dummy data for testing
  public data: any;
  public handleSetResource: any;
  /*@ngInject*/
  constructor(
    private $timeout,
    private $http: any,
    private API: any) {
    this.data = [];
  }

  public parseSelectable = (data: any) => {
    console.log('data aei: ', data);
    return data.map((node, key) => {
      const parsedData = Object.assign({}, node);
      if(parsedData.nodes) {
        parsedData.nodes = node.nodes.map((childNode, childKey) => {
          const child = Object.assign({}, childNode);
          child.selectable = child.key.toLowerCase().includes('aei');
          return child;
        });
      }
      parsedData.selectable = parsedData.key.toLowerCase().includes('aei');
      return parsedData;
    });
  }

  public $onInit() {
    const tree = $('#treeview');
    const ctrl = this;
    this.$http({
      method: 'GET',
      url: 'http://localhost:3000/tree/automate_entrypoint',
    }).then(function successCallback(response) {
        tree.treeview({
          data: ctrl.parseSelectable(response.data),
          onNodeSelected: (event, data) => ctrl.getSelected(event, data),
          expandIcon: 'fa fa-fw fa-angle-right',
          collapseIcon: 'fa fa-fw fa-angle-down',
          loadingIcon: 'fa fa-fw fa-spinner fa-pulse',
          showBorders: false,
          showImage: true,
          preventUnselect: true,
          lazyLoad: function (node, display) {
            ctrl.$http({
              method: 'GET',
              url: `http://localhost:3000/tree/automate_entrypoint?id=${encodeURIComponent(node.key)}`,
            }).then(function successCallback(response) {
              display(ctrl.parseSelectable(response.data));
            }, function errorCallback(response){
              console.log('error: ', response);
            });
          }
        });
    }, function errorCallback(response) {
      console.log('error: ', response);
    });

    tree.treeview({
      data: [],
      onNodeSelected: this.getSelected,
      expandIcon: 'fa fa-fw fa-angle-right',
      collapseIcon: 'fa fa-fw fa-angle-down',
      loadingIcon: 'fa fa-fw fa-spinner fa-pulse',
      showBorders: false,
      showImage: true,
      preventUnselect: true,
      lazyLoad: function (node, display) {
        $.ajax({
          url:  '/tree/automate_entrypoint',
          type: 'post',
          data: {
            id: node.key,
          }
        });
      }
    });
  }

  public getSelected = (event, data) => {
      this.$timeout(() => this.handleSetResource(data.dataAttr.fqname));
  }
}
/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name DialogTreeWrapper
 * @description
 *    Component for rendering dialog tree for automate api
 * @example
 * none yet
 */
export default class DialogTreeWrapper {
  public template = require('./dialogTreeWrapper.html');
  public controller: any = DialogTreeWrapperController;
  public controllerAs: string = 'vm';
  public bindings: any = {
     handleSetResource: '<',
  };
}
