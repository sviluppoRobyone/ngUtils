import * as angular from "angular";
import { GetLogger } from "../log";
import BaseObj from "../../js-helpers/obj-helpers";

import poly from "../../polyfill/index";
poly();
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
    private checkInit(){
        
        this.$log.debug(this._className,"Init");
        this.$log.debug(this._className,"Args["+this._args.length+"]",this._args,this._args.describe().toJSON());
        if (this._self$inject)
        {
            this.$log.debug(this._className,"$inject["+this._self$inject.length+"]",this._self$inject);
            if (this._args.length!=this._self$inject.length){
                this.$log.error(this._className,"Incongruenza dipendenze","Richieste: ",this._self$inject.length,"Passate: ",this._args.length);
            }
            this._self$inject.filter((x,index)=>!this._args[index]).forEach((x,index)=>{
                this.$log.error(this._className,"La dipendenza",x,"non è stata soddisfatta",this._args[index]);
            });
        }
        else
        {
            this.$log.debug(this._className,"No $inject array detected");
        }
        this.$log.debug(this._className,"----");
    }
    public constructor(...args){
        super();
        this._args = args;
       
       
        ["_store","_args"].forEach(x=>{
            Object.defineProperty(this,x,{enumerable:false});
        });

        this.checkInit();
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