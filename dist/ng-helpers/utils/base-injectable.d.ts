/// <reference types="angular" />
export declare abstract class BaseInjectable {
    static $inject: string[];
    private _store;
    private _args;
    protected getFromInject<T>(key: string): T;
    constructor(...args: any[]);
    protected readonly $injector: ng.auto.IInjectorService;
    protected readonly $injectedArgs: any[];
}
