import * as angular from "angular";
import * as bj from "./utils/base-injectable";
import * as ngUtils from "./service";
import * as nameGenerator from "./utils/name-generator";
import { BaseInjectable } from "./utils/base-injectable";


export var serviceName = nameGenerator.GetServiceName("AsyncLoader");

export function register(m:ng.IModule){
    m.service(serviceName,Service);
    directive.register(m);
}

export interface IGetDataFunction<T>{
    (resolve: ng.IQResolveReject<T>, reject: ng.IQResolveReject<any>):void;
}
export interface IAsyncLoaderConstructor<T>{
    $q:ng.IQService;
    $timeout:ng.ITimeoutService;
    Fn:IGetDataFunction<T>
}

export class Config<T>{
    public args:IAsyncLoaderConstructor<T>=null;
    public isLoading :boolean=false;
    public isSuccess: boolean=false;
    public isFailed: boolean=false;
    public successCount:number=0;
    public GetDataFn:IGetDataFunction<T> =null;
}

export class AsyncLoader<T> {

    
    protected get $q(){
        return this._config.args.$q;
    }

   
    protected get $timeout(){
        return this._config.args.$timeout;
    }

   
    private _config: Config<T>=new Config<T>();

   
    public get IsLoading(){
        return this._config.isLoading;
    }

  
    public get IsSuccess(){
        return this._config.isSuccess;
    }

   
    public get IsFailed(){
        return this._config.isFailed;
    }

    
    private _Data :T=null;

   
    public get Data(){
        return this._Data;
    }

    constructor(c:IAsyncLoaderConstructor<T>){
       this._config.args=c; 
       ["_Data","_config"].forEach(x=>{
        Object.defineProperty(this,x,{enumerable:false});
        });
    }

   
    Update(){
        return this.$q(ok=>{
            
            this.$timeout(()=>{
                this._config.isLoading=true;
            }).then(()=>{
                this.$q<T>(this._config.args.Fn).then(data=>{ 

                    this._Data=data;

                    this.$timeout(()=>{
                        this._config.successCount++;
                        this._config.isLoading=false;
                        this._config.isSuccess=true;
                        this._config.isFailed=false;
                    }).then(()=>{
                        ok();
                    });
                    
                }).catch(()=>{
                   
                    this.$timeout(()=>{
                        this._config.isLoading=false;
                        this._config.isSuccess=true;
                        this._config.isFailed=false;
                    }).then(()=>{
                        ok();
                    });
                });


            });
        });
    }
}

export class Service extends bj.BaseInjectable{
    
  
    protected get $q(){
        return this.getFromInject("$q") as ng.IQService;
    }

    
    protected get $timeout(){
        return this.getFromInject("$timeout") as ng.ITimeoutService;
    }

    public Create<T>(f:IGetDataFunction<T>) :AsyncLoader<T>{
        return new AsyncLoader({
            $q:this.$q,
                    $timeout:this.$timeout,
                        Fn:f});
    }
}

module directive{
    export function register(m:ng.IModule){
        m.directive("asyncLoader",directive);
    }
    function directive(){
        return {
            
            template:`
        
            <span ng-transclude="content" ng-if="Ctrl.IsSuccess"></span>
            <span ng-transclude="loading" ng-if="Ctrl.IsLoading"></span>
            <span ng-if="Ctrl.IsFailed">
                Errore
            </span>
            `,
            scope:{
                loaders:"="               
            },
            controller:Ctrl,
            controllerAs:"Ctrl",
            transclude:{
                loading:"loading",
                content:"content"
            }

        }as ng.IDirective;
    }

    class Ctrl extends BaseInjectable {
        public $inject=BaseInjectable.$inject.concat(["$scope"]);
        get $scope():ng.IScope{
            return this.$injectedArgs[Ctrl.$inject.indexOf("$scope")];
        }
        get loaders(){
            return this.$scope["loaders"];
        }
        get AsyncLoaders():AsyncLoader<any>[]{
            return this.loaders.filter(x=> x instanceof AsyncLoader);
        }
        
        get IsLoading(){
            return this.AsyncLoaders.some(x=>x.IsLoading);
        }

        get IsSuccess(){
            return this.AsyncLoaders.every(x=>x.IsSuccess);
        }

        get IsFailed(){
            return this.AsyncLoaders.some(x=>x.IsFailed);
        }       
        
    }
}