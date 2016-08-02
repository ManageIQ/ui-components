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
 * @memberof miqStaticAssets
 * @ngdoc directive
 * @name miqToolbarButton
 * @description
 *    Directive withou controller. It will create new toolbar button in toolbar.
 *
 * @attr {Expression} onItemClick
 *    Method for handling clicking on this button (will be called with `{item: item}` object).
 * @attr {IToolbarItem} toolbarButton
 *    Toolbar item based on which will be this button generated.
 * @example
 * <miq-toolbar-button toolbar-button="toolbarButton"
 *                   on-item-click="ctrl.onClick(item)">
 * </miq-toolbar-button>
 */
export default class ToolbarButton implements ng.IDirective {
  public replace: boolean = true;
  public template = require<string>('./toolbar-button.html');
  public scope: any = {
    toolbarButton: '<',
    onItemClick: '&'
  };

  public static Factory = () => {
    let directive: ng.IDirectiveFactory = () => new ToolbarButton();
    directive.$inject = [];
    return directive;
  };
}
