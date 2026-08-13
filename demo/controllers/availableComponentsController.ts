import AvailableComponentsService from './../services/availableComponentsService';
import {IAvailableGroup} from '../services/availableComponentsService';

export default class AvailableComponentsController {
  public availableComponents: IAvailableGroup[];

  public constructor() {
    this.availableComponents = (new AvailableComponentsService()).availableComponents;
  }
}
