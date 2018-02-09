import * as angular from "angular";
import { GetLogger } from "../log";
import BaseObj from "../../js-helpers/obj-helpers";

export default abstract class BaseInjectable extends BaseObj{
    public static $inject :string[] = ["$injector"];

    protected get _self$inject():string[]{
        return this._objInfo.Constructor.$inject;
    }

    protected GetInjected<T>(name:string) {
        return this.$injectedArgs[this._self$inject.indexOf(name)];
    }
   
    private _store : any = {};
  
    private _args : any[]=[];

   
    protected getFromInjector<T>(key: string) {
        if (typeof key !==typeof "" || !key)
            GetLogger().error(this._objInfo.ClassName,"Error injecting not a string or null",key);
            
        if (!this._store[key])
            this._store[key] = this.$injector.get<T>(key);

        return this._store[key] as T;

    }

    private checkInit(){
        
        this.$log.debug(this._objInfo.ClassName,"Init");
        this.$log.debug(this._objInfo.ClassName,"Args["+this.$injectedArgs.length+"]",this.$injectedArgs,this.$injectedArgs.describe().asJSON());
        if (this._self$inject)
        {
            this.$log.debug(this._objInfo.ClassName,"$inject["+this._self$inject.length+"]",this._self$inject);
            if (this.$injectedArgs.length!=this._self$inject.length){
                this.$log.error(this._objInfo.ClassName,"Incongruenza dipendenze","Richieste: ",this._self$inject.length,"Passate: ",this.$injectedArgs.length);
            }
            this._self$inject.filter((x,index)=>!this.$injectedArgs[index]).forEach((x,index)=>{
                this.$log.error(this._objInfo.ClassName,"La dipendenza",x,"non è stata soddisfatta",this.$injectedArgs[index]);
            });
        }
        else
        {
            this.$log.debug(this._objInfo.ClassName,"No $inject array detected");
        }
       
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
        return this.GetInjected("$injector");
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