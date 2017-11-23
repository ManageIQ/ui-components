import AvailableComponentsService from './../services/availableComponentsService';
import {IAvailableGroup} from '../services/availableComponentsService';

export default class AvailableComponentsController {
  public availableComponents: IAvailableGroup[];

  /* @ngInject */
  public constructor() {
    this.availableComponents = (new AvailableComponentsService()).availableComponents;
  }
}
