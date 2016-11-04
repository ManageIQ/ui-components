/// <reference path="../tsd.d.ts" />
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
    target: string;
    toggle: string;
}
/**
 * @interface
 */
export interface ICustomToolbarItem extends IToolbarItem {
    html: string;
}
