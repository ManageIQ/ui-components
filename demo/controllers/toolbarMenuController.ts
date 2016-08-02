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

///<reference path="../tsd.d.ts"/>

export default class ToolbarMenuController {
  public toolbarMenu: any;
  public toolbarMenuViews: any;

  public constructor(private MiQToolbarSettingsService: any, private MiQEndpointsService: any) {
    this.setEndpoints();
    this.MiQToolbarSettingsService.getSettings(true)
      .then(dataResponse => {
        this.toolbarMenu = dataResponse.items;
        this.toolbarMenuViews = dataResponse.dataViews;
      });
  }

  public onViewClick(item: any) {
    this.toolbarMenuViews.forEach((item: any) => {
      item.selected = false;
    });
    item.selected = true;
  }

  private setEndpoints() {
    this.MiQEndpointsService.rootPoint = '/data';
    this.MiQEndpointsService.endpoints.toolbarSettings = '/toolbar.json';
  }
}
