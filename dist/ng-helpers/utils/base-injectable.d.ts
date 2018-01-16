/// <reference types="angular" />
export declare abstract class BaseInjectable {
    static $inject: string[];
    private _store;
    private _args;
    protected getFromInject<T>(key: string): any;
    constructor(...args: any[]);
    protected readonly $injector: angular.auto.IInjectorService;
    protected readonly $injectedArgs: any[];
}
