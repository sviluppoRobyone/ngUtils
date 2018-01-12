/// <reference types="angular" />
import * as angular from "angular";
import { BaseInjectable } from "../utils/base-injectable";
export declare class Interceptor extends BaseInjectable implements ng.IHttpInterceptor {
    static $inject: string[];
    private errorList;
    private readonly $q;
    private readonly $uibModal;
    private $modal;
    responseError: (rejection: any) => angular.IPromise<never>;
}
