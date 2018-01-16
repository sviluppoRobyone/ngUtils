/// <reference types="angular" />
import * as angular from "angular";
import * as bj from "./utils/base-injectable";
export declare var serviceName: string;
export declare function register(m: ng.IModule): void;
export interface IGetDataFunction<T> {
    (): ng.IPromise<T>;
}
export interface IAsyncLoaderConstructor<T> {
    $q: ng.IQService;
    $timeout: ng.ITimeoutService;
    Fn: IGetDataFunction<T>;
}
export declare class Config<T> {
    args: IAsyncLoaderConstructor<T>;
    _isLoading: boolean;
    _isSuccess: boolean;
    _isFailed: boolean;
    GetDataFn: IGetDataFunction<T>;
}
export declare class AsyncLoader<T> {
    protected readonly $q: angular.IQService;
    protected readonly $timeout: angular.ITimeoutService;
    protected readonly config: Config<T>;
    private _config;
    protected readonly IsLoading: boolean;
    protected readonly IsSuccess: boolean;
    protected readonly IsFailed: boolean;
    protected Data: T;
    constructor(c: IAsyncLoaderConstructor<T>);
    Update(): angular.IPromise<{}>;
}
export declare class Service extends bj.BaseInjectable {
    protected readonly $q: angular.IQService;
    protected readonly $timeout: angular.ITimeoutService;
    Create<T>(f: IGetDataFunction<T>): AsyncLoader<T>;
}
