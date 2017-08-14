import * as ng from 'angular';
import * as _ from 'lodash';
import {__} from '../../../common/translateFunction';

/**
 * Controller for the Dialog Editor box component
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name DialogTreeWrapper
 */
class DialogTreeItemController {
  public iconClass: any;
  public showCategories: boolean;
  public data: any;
  public handleSelectResource: any;

  constructor() {
    this.iconClass = {
      MiqAeDomain: 'fa fa-globe',
      MiqAeNamespace: 'pficon pficon-folder-close',
      MiqAeClass: 'ff ff-class',
      MiqAeInstance: 'fa fa-file-text-o',
    };
    this.showCategories = false;
  }

  public toggleCategory() {
    this.showCategories = !this.showCategories;
  }

  public hasSubcategory() {
    return this.data.instances || this.data.classes || this.data.namespaces;
  }

  public handleItemClick(event) {
    event.stopPropagation();
    if(this.data.klass === 'MiqAeInstance') {
      this.handleSelectResource(this.data.fqname);
    }else {
      this.toggleCategory();
    }
  }

}

export default class DialogTreeItem {
  public template = require('./dialogTreeItem.html');
  public controller: any = DialogTreeItemController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    data: '<',
    handleSelectResource: '<',
  };
}
