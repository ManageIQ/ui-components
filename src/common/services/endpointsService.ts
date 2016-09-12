import {IEndpoints} from '../interfaces/endpoints';
export class DefaultEndpoints implements IEndpoints {
  public listDataTable: string;
  public deleteItemDataTable: string;
  public validateItem: string;
  public createItem: string;
  public providerSettings: string;
  public toolbarSettings: string;
  constructor() {
    this.listDataTable = '/list';
    this.deleteItemDataTable = '/delete';
    this.validateItem = '/validate';
    this.createItem = '/create';
    this.providerSettings = '/list_providers_settings';
    this.toolbarSettings = '/toolbar';
  }
}

export default class EndpointsService {
  public endpoints: IEndpoints;
  public rootPoint: string = '';

  constructor() {
    this.endpoints = new DefaultEndpoints;
  }
}
