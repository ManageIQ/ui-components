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

/**
 * Asf
 *
 * @interface
 */
export interface IToolbarListBindings {
  toolbarList: any;
  onItemClick: (args: {item: any}) => void;
}

/**
 * @memberof miqStaticAssets
 * @ngdoc controller
 * @name ToolbarListController
 * @implements {IToolbarListBindings}
 */
export class ToolbarListController implements IToolbarListBindings {
  public toolbarList: any;

  /**
   * Method for handling clicking on toolbar list's item.
   * @memberof ToolbarListController
   * @function onItemClick
   * @param {Object} {item: Object} object with item property set to which item was clicked.
   */
  public onItemClick: (args: {item: any, $event: any}) => void;
}

/**
 * @memberof miqStaticAssets
 * @ngdoc component
 * @name miqToolbarList
 * @description
 *    Component which will generate list in toolbar with toolbarItems as dropdown menu.
 *
 * @attr {Expression} onItemClick
 *    Method which will be executed when clicked on view. See
 *    {@link miqStaticAssets.ToolbarListController#onItemClick} which arguments are
 *    needed.
 * @attr {Array} toolbarItems
 *    List of all items which are used in toolbar. Since we use typescript this attribute has specific type of:
 *    `Array<Array<IToolbarItem>>` See {@link IToolbarItem} for entities of toolbarItems.
 * @example
 * <miq-toolbar-list toolbar-list="ctrl.toolbarItems"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-list>
 */
export default class ToolbarList {
  public replace: boolean = true;
  public template = require<string>('./toolbar-list.html');
  public controller: any = ToolbarListController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    toolbarList: '<',
    onItemClick: '&'
  };
}
