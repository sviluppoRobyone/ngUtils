import * as angular from "angular";
import * as bi from "../utils/base-injectable";
import * as nameGenerator from "../utils/name-generator";

export function register(m:ng.IModule){
    m.service(serviceName,Service);
}
export var serviceName=nameGenerator.GetServiceName("debug");
export interface IDebugDetectorFunction{
    ():ng.IPromise<boolean>
}
export module Detectors{
    export const DebugName="DEBUG";
    export function IsLocalhost(){
        return window.location.hostname =="localhost" || window.location.hostname == "127.0.0.1";
    }
    export function IsLocalDomain(){
        return window.location.hostname.endsWith(".local");
    }
    export function IsWindowDebugDefined(){
        return DebugName in window;
    }

    export function GetWindowDebugValue(){
        if (!IsWindowDebugDefined()) throw "["+DebugName+"] must be defined in window: window."+DebugName+"=true/false;";

        return window[DebugName];
    }


}
export class Service extends bi.BaseInjectable{
    get $timeout(): ng.ITimeoutService {
        return this.getFromInject("$timeout");
    }
    get $rootScope(): ng.IRootScopeService {
        return this.getFromInject("$rootScope");
    }
    get $q(): ng.IQService {
        return this.getFromInject("$q");
    }
    DebugStatus:boolean=false;

    private Updater:IDebugDetectorFunction=null;

    constructor(...args){
        super(...args);
        this.init();
    }
    private UpdateStatus(){
        this.Updater().then(x=>{

            this.$timeout(()=>{
                this.DebugStatus=x;
            });
            
        })
    }
    private init(){
        var fn:IDebugDetectorFunction=()=>{
            return this.$q.resolve<boolean>(this.updateDebugV1);
        }
        this.SetDebugUpdater(fn);
        this.$rootScope.$watch(()=>{
            
        });
    }
    SetDebugUpdater(f:IDebugDetectorFunction){
        this.Updater=f;
    }

    get updateDebugV1(){
        
        return     Detectors.IsWindowDebugDefined()?Detectors.GetWindowDebugValue():(Detectors.IsLocalhost() || Detectors.IsLocalDomain())

        
    }
}