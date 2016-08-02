/// <reference path="../tsd.d.ts" />
export interface IEndpoints {
    listDataTable: string;
    deleteItemDataTable: string;
    validateItem: string;
    createItem: string;
    providerSettings: string;
    toolbarSettings: string;
}
export declare class DefaultEndpoints implements IEndpoints {
    listDataTable: string;
    deleteItemDataTable: string;
    validateItem: string;
    createItem: string;
    providerSettings: string;
    toolbarSettings: string;
    constructor();
}
export default class EndpointsService {
    endpoints: IEndpoints;
    rootPoint: string;
    constructor();
}
