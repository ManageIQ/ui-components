///
/// Copyright 2015-2016 Red Hat, Inc. and/or its affiliates
/// and other contributors as indicated by the @author tags.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///    http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

export interface IEndpoints {
  listDataTable: string;
  deleteItemDataTable: string;
  validateItem: string;
  createItem: string;
  providerSettings: string;
  toolbarSettings: string;
}

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
