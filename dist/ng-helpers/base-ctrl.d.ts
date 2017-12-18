/// <reference types="angular" />
import * as angular from "angular";
import { ngUtilsService } from "./service";
import { baseInjectable } from "./base-injectable";
export declare class BaseCtrl extends baseInjectable {
    static $inject: string[];
    readonly $scope: angular.IScope;
    readonly $ngUtils: ngUtilsService;
    readonly $q: angular.IQService;
}
