import * as angular from "angular";
import { ConsoleUtils } from "../core";
import { BaseObj,arrays } from "../../js-helpers/obj-helpers";
export default abstract class BaseInjectable extends BaseObj{
    public static $inject = ["$injector"];

    private get _self$inject():string[]{
        return this._constructor.$inject;
    }

   
    private _store : any= {};
  
    private _args : any[]=[];

   
    protected getFromInjector<T>(key: string) {
        if (!this._store[key])
            this._store[key] = this.$injector.get<T>(key);

        return this._store[key] as T;

    }

    public constructor(...args){
        super();

        {
            var logger= ConsoleUtils.GetLogger();
            logger.debug("----");
            logger.debug("Init",this._className);
            logger.debug("Args["+args.length+"]",args,JSON.stringify(arrays.describeArray(args)));
            if (this._self$inject)
            {
                logger.debug("$inject["+this._self$inject.length+"]",this._self$inject);
                if (args.length!=this._self$inject.length){
                    logger.error("Incongruenza dipendenze");
                }
                this._self$inject.filter((x,index)=>!args[index]).forEach((x,index)=>{
                    logger.error("La dipendenza",x,"non è stata soddisfatta",args[index]);
                });
            }
            else
            {
                    logger.debug("No $inject array detected");
            }
            logger.debug("----");
        }

        this._args = args;
        ["_store","_args"].forEach(x=>{
            Object.defineProperty(this,x,{enumerable:false});
        });
    }

  
    protected get $injector(): ng.auto.IInjectorService {        
        return this.$injectedArgs[BaseInjectable.$inject.indexOf("$injector")];
    }
    
   
    protected get $injectedArgs(){
        return this._args;
    }
    protected get $rootScope(){
        return this.getFromInjector<ng.IRootScopeService>("$rootScope");
    }

    protected get $http()  {
        return this.getFromInjector<ng.IHttpService>("$http");
    }
    protected get $location()  {
        return this.getFromInjector<ng.ILocationService>("$location");
    }
    protected get $q() {
        return this.getFromInjector<ng.IQService>("$q");
    }
    protected get $filter() {
        return this.getFromInjector<ng.IFilterService>("$filter");
    }
    protected get $timeout() {
        return this.getFromInjector<ng.ITimeoutService>("$timeout");
    }
    protected get $cacheFactory() {
        return this.getFromInjector<ng.ICacheFactoryService>("$cacheFactory");
    }
    protected get $locale(){
        return this.getFromInjector<ng.ILocaleService>("$locale");
    }
    protected get $interval() {
        return this.getFromInjector<ng.IIntervalService>("$interval");
    }
    protected get $log() {
        return this.getFromInjector<ng.ILogService>("$log");
    }
    protected get $sce() {
        return this.getFromInjector<ng.ISCEService>("$sce");
    }
    protected get $Upload() {
        return this.getFromInjector<ng.angularFileUpload.IUploadService>("Upload");
    }    
    protected get $stateParams() {
        return this.getFromInjector<ng.ui.IStateParamsService>("$stateParams");
    }
    protected get $state() {
        return this.getFromInjector<ng.ui.IStateService>("$state");
    }
    protected get $uibModal(){
        return this.getFromInjector<ng.ui.bootstrap.IModalService>("$uibModal");
    }
}