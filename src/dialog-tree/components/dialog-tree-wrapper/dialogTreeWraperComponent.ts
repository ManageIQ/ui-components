import * as ng from 'angular';
import * as _ from 'lodash';
import {__} from '../../../common/translateFunction';

const Promise = (<any> window).Promise;

/**
 * Controller for the Dialog Editor box component
 * @memberof miqStaticAssets
 * @ngdoc controllertreeview
 * @name DialogTreeWrapper
 */
class DialogTreeWrapperController {

  public data: any;
  public handleSetResource: any;
  public openTreeView: any;
  private URL: string;
  /*@ngInject*/
  constructor(
    private $timeout,
    private $http: any) {
    this.URL = '/tree/automate_entrypoint';
    this.getInitialData().then((data) => {
      this.data = data;
    });
  }

  public parseSelectable = (data: any) => {
    return data.map((node, key) => {
      const parsedData = {...node};
      if(parsedData.nodes) {
        parsedData.nodes = node.nodes.map((childNode, childKey) => {
          const child = {...childNode};
          child.selectable = child.key.toLowerCase().includes('aei');
          return child;
        });
      }
      parsedData.selectable = parsedData.key.toLowerCase().includes('aei');
      return parsedData;
    });
  }

  public lazyLoad = (node) => {
    const dataPromise = this.getInitialData(node.key);
    return dataPromise.then((data) => {
      return this.parseSelectable(data);
    });
  }

  private getInitialData = (id?) => {
    return this.$http({
      method: 'GET',
      url: id ? `${this.URL}?id=${encodeURIComponent(id)}` : this.URL,
    }).then((response) => {
      return this.parseSelectable(response.data);
    });
  }

  public getSelected = (data) => {
    this.$timeout(() => this.handleSetResource(data.dataAttr.fqname));
    this.openTreeView(false);
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
     openTreeView: '<',
  };
}
