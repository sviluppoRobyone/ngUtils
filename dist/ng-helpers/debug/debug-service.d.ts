/// <reference types="angular" />
import * as bi from "../utils/base-injectable";
export declare function register(m: ng.IModule): void;
export declare var serviceName: string;
export interface IDebugDetectorFunction {
    (): ng.IPromise<boolean>;
}
export declare module Detectors {
    const DebugName = "DEBUG";
    function IsLocalhost(): boolean;
    function IsLocalDomain(): boolean;
    function IsWindowDebugDefined(): boolean;
    function GetWindowDebugValue(): any;
}
export declare class Service extends bi.BaseInjectable {
    readonly $timeout: ng.ITimeoutService;
    readonly $rootScope: ng.IRootScopeService;
    readonly $q: ng.IQService;
    DebugStatus: boolean;
    private Updater;
    constructor(...args: any[]);
    private UpdateStatus();
    private init();
    SetDebugUpdater(f: IDebugDetectorFunction): void;
    readonly updateDebugV1: any;
}
