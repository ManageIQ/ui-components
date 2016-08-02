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
 * @interface
 */
export interface IToolbarSettings {
  items: Array<IToolbarItem>[];
  dataViews: IToolbarItem[];
}

/**
 * @interface
 */
export interface IRequestData {
  lastAction: string;
  id?: number;
  display?: string;
  gtl_type?: string;
}

/**
 * @interface
 */
export interface IToolbarItem {
  type?: string;
  text?: string;
  title?: string;
  name?: string;
  id?: string;
  onwhen?: string;
  enabled?: boolean;
  hidden?: boolean;
  url_parms?: string;
  url?: string;
  items?: IToolbarItem[];
  args?: ICustomToolbarItem;
  data?: IToolbarData;
}

/**
 * @interface
 */
export interface IToolbarData {
  'function': string;
  'function-data': string;
  targer: string;
  toggle: string;
}

/**
 * @interface
 */
export interface ICustomToolbarItem extends IToolbarItem {
  html: string;
}
