/// <reference types="angular" />
export declare abstract class BaseInjectable {
    static $inject: string[];
    private store;
    protected args: any[];
    protected getFromInject<T>(key: string): any;
    constructor(...args: any[]);
    readonly $injector: angular.auto.IInjectorService;
}
