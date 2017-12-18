/// <reference types="angular" />
import * as angular from "angular";
export declare class Interceptor implements ng.IHttpInterceptor {
    static $inject: string[];
    private readonly args;
    private errorList;
    readonly $injector: ng.auto.IInjectorService;
    private readonly $q;
    private readonly $uibModal;
    constructor(...args: any[]);
    private $modal;
    responseError: (rejection: any) => angular.IPromise<never>;
}
