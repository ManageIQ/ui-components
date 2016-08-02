/// <reference path="../tsd.d.ts" />
import { IToolbarItem, IToolbarSettings, IRequestData } from '../interfaces/toolbar';
export default class ToolbarSettingsService {
    private $http;
    private MiQEndpointsService;
    private countSelected;
    items: Array<Array<IToolbarItem>>;
    dataViews: Array<IToolbarItem>;
    constructor($http: any, MiQEndpointsService: any);
    /**
     * Method which will travers trough all items and enables them by number of selected items.
     * @param isClicked
     */
    checkboxClicked(isClicked: boolean): void;
    /**
     *
     * @param toolbarObject
     * @returns {{items: Array<Array<IToolbarItem>>, dataViews: Array<IToolbarItem>}}
       */
    generateToolbarObject(toolbarObject: Array<Array<IToolbarItem>>): IToolbarSettings;
    /**
     *
     * @returns {ng.IPromise<IToolbarSettings>}
     * @param getData
     */
    getSettings(getData: IRequestData): ng.IPromise<IToolbarSettings>;
    /**
     *
     * @returns {Array<IToolbarItem>}
     */
    private filterViews();
    /**
     *
     * @param url
     * @param dataObject
     * @returns {ng.IPromise<Array<Array<IToolbarItem>>>}
     */
    private httpGet(url, dataObject);
    /**
     *
     * @param toolbarItem
     */
    private enableToolbarItemByCountSelected(toolbarItem);
    /**
     *
     * @param onWhen
     * @returns {number}
     */
    private static parseNumberFromWhen(onWhen);
}
