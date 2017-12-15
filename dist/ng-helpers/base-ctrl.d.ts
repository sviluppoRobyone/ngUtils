/// <reference types="angular" />
import * as angular from "angular";
import { ngUtilsService } from "./service";
export declare class BaseCtrl {
    static $inject: string[];
    args: any[];
    constructor(...args: any[]);
    readonly $scope: ng.IScope;
    readonly $ngUtils: ngUtilsService;
    readonly $q: angular.IQService;
}
