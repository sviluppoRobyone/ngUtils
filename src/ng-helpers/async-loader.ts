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

    private _Data :T=null;
    private _c: Config<T>=new Config<T>();

    protected get $q(){
        return this._c.args.$q;
    }

   
    protected get $timeout(){
        return this._c.args.$timeout;
    }  

   
    public get IsLoading(){
        console.log(this);
        return this._c.isLoading;
    }

  
    public get IsSuccess(){
        return this._c.isSuccess;
    }

   
    public get IsFailed(){
        return this._c.isFailed;
    }  
 

   
    public get Data(){
        return this._Data;
    }

    constructor(c:IAsyncLoaderConstructor<T>){
       this._c.args=c; 
       ["_Data","_c"].forEach(x=>{
        Object.defineProperty(this,x,{enumerable:false});
        });
    }

   
    Update(){
        return this.$q((ok,ko)=>{
            
            this.$timeout(()=>{
                this._c.isLoading=true;
            }).then(()=>{
                this.$q<T>(this._c.args.Fn).then(data=>{ 

                    this._Data=data;

                    this.$timeout(()=>{
                        this._c.successCount++;
                        this._c.isLoading=false;
                        this._c.isSuccess=true;
                        this._c.isFailed=false;
                    }).then(()=>{
                        ok();
                    });
                    
                }).catch(()=>{
                    this._Data=null;
                    this.$timeout(()=>{
                        this._c.isLoading=false;
                        this._c.isSuccess=false;
                        this._c.isFailed=true;
                    }).then(()=>{
                        ko();
                    });
                });


            });
        });
    }
}

export class Service extends bj.BaseInjectable{
    
  
    protected get $q(){
        return this.getFromInjector("$q") as ng.IQService;
    }

    
    protected get $timeout(){
        return this.getFromInjector("$timeout") as ng.ITimeoutService;
    }

    public Create<T>(f:IGetDataFunction<T>) :AsyncLoader<T>{
        return new AsyncLoader({
            $q:this.$q,
            $timeout:this.$timeout,
            Fn:f
        });
    }
}

module directive{
    export function register(m:ng.IModule){
        m.directive("asyncLoader",directive);
    }
    var scopeLoadersKey="loaders";
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
                [scopeLoadersKey]:"="               
            },
            controller:Ctrl,
            controllerAs:"Ctrl",
            transclude:{
                loading:"loading",
                content:"content"
            }

        } as ng.IDirective;
    }

    class Ctrl extends BaseInjectable {
        public static $inject=BaseInjectable.$inject.concat(["$scope"]);
        protected get $scope():ng.IScope{
            return this.$injectedArgs[Ctrl.$inject.indexOf("$scope")];
        }
        protected get loaders():any[]{
          return this.$scope[scopeLoadersKey] && this.$scope[scopeLoadersKey] instanceof Array? this.$scope[scopeLoadersKey]:[this.$scope[scopeLoadersKey]];
           
        }
        public get AsyncLoaders():AsyncLoader<any>[]{

            return this.loaders.filter(x=> x instanceof AsyncLoader);
           
        }
        
        public get IsLoading(){
            return this.AsyncLoaders.some(x=>x.IsLoading);
        }

        public get IsSuccess(){
            return this.AsyncLoaders.every(x=>x.IsSuccess);
        }

        public get IsFailed(){
            return this.AsyncLoaders.some(x=>x.IsFailed);
        }       
        
    }
}