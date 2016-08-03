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

import {IToolbarItem, IToolbarSettings, IRequestData} from '../interfaces/toolbar';

export default class ToolbarSettingsService {
  private countSelected: number = 0;
  public items: Array<Array<IToolbarItem>>;
  public dataViews: Array<IToolbarItem>;

  /*@ngInject*/
  constructor(private $http: any, private MiQEndpointsService: any) {}

  /**
   * Method which will travers trough all items and enables them by number of selected items.
   * @param isClicked
   */
  public checkboxClicked(isClicked: boolean): void {
    isClicked ? this.countSelected++ : this.countSelected--;
    _.chain(this.items)
      .flatten()
      .filter(item => item)
      .each((item: any) => {
        this.enableToolbarItemByCountSelected(item);
      })
      .map('items')
      .flatten()
      .filter(item => item)
      .each((item: any) => {
        this.enableToolbarItemByCountSelected(item);
      })
      .value();
  }

  /**
   *
   * @param toolbarObject
   * @returns {{items: Array<Array<IToolbarItem>>, dataViews: Array<IToolbarItem>}}
     */
  public generateToolbarObject(toolbarObject: Array<Array<IToolbarItem>>): IToolbarSettings {
    this.items = toolbarObject.filter(item => !!item);
    this.dataViews = this.filterViews();
    return {
      items: this.items,
      dataViews: this.dataViews
    };
  }

  /**
   *
   * @returns {ng.IPromise<IToolbarSettings>}
   * @param getData
   */
  public getSettings(getData?: IRequestData): ng.IPromise<IToolbarSettings> {
    return this.httpGet(
      this.MiQEndpointsService.rootPoint + this.MiQEndpointsService.endpoints.toolbarSettings,
      getData
    ).then((items: Array<IToolbarItem>[]) => {
      this.items = items.filter(item => !!item);
      this.dataViews = this.filterViews();
      return {
        items: items,
        dataViews: this.dataViews
      };
    });
  }

  /**
   *
   * @returns {Array<IToolbarItem>}
   */
  private filterViews(): Array<IToolbarItem> {
    return _.flatten(this.items)
      .filter(
        item => item && item.id && item.id.indexOf('view_') === 0
      );
  }

  /**
   *
   * @param url
   * @param dataObject
   * @returns {ng.IPromise<Array<Array<IToolbarItem>>>}
   */
  private httpGet(url: string, dataObject: any): ng.IPromise<Array<Array<IToolbarItem>>> {
    return this.$http.get(url, {params: dataObject})
      .then(dataResponse => dataResponse.data);
  }

  /**
   *
   * @param toolbarItem
   */
  private enableToolbarItemByCountSelected(toolbarItem: IToolbarItem): void {
    if (toolbarItem.onwhen) {
      if (toolbarItem.onwhen.slice(-1) === '+') {
        toolbarItem.enabled = this.countSelected >= ToolbarSettingsService.parseNumberFromWhen(toolbarItem.onwhen);
      } else {
        toolbarItem.enabled = this.countSelected === parseInt(toolbarItem.onwhen, 10);
      }
    }
  }

  /**
   *
   * @param onWhen
   * @returns {number}
   */
  private static parseNumberFromWhen(onWhen: string) {
    return onWhen.indexOf('+') !== -1 ? parseInt(onWhen.slice(0, onWhen.length - 1), 10) : parseInt(onWhen, 10);
  }
}
