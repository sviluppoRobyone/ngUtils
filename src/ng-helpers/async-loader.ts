import * as angular from "angular";
import * as bj from "./utils/base-injectable";
import * as ngUtils from "./service";
import * as nameGenerator from "./utils/name-generator";
import  BaseInjectable  from "./utils/base-injectable";
import { registerService, registerDirective } from "./core";


export var serviceName = nameGenerator.GetServiceName("AsyncLoader");

export default function register(m:ng.IModule){
    registerService(m,serviceName,Service);
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

    private internalData :T=null;
    private config: Config<T>=new Config<T>();

    protected get $q(){
        return this.config.args.$q;
    }
   
    protected get $timeout(){
        return this.config.args.$timeout;
    }
   
    public get IsLoading(){
        return this.config.isLoading;
    }
  
    public get IsSuccess(){
        return this.config.isSuccess;
    }

   
    public get IsFailed(){
        return this.config.isFailed;
    }  
 

   
    public get Data(){
        return this.internalData;
    }

    constructor(c:IAsyncLoaderConstructor<T>){
       this.config.args=c; 
       ["internalData","config"].forEach(x=>{
        Object.defineProperty(this,x,{enumerable:false});
        });
    }

   
    Update(){
        return this.$q((ok,ko)=>{
            
            this.$timeout(()=>{
                this.config.isLoading=true;
                this.config.isSuccess=false;
                this.config.isFailed=false;
            }).then(()=>{
                this.$q<T>(this.config.args.Fn).then(data=>{ 

                    this.internalData=data;

                    this.$timeout(()=>{
                        this.config.successCount++;
                        this.config.isLoading=false;
                        this.config.isSuccess=true;
                        this.config.isFailed=false;
                    }).then(()=>{
                        ok();
                    });
                    
                }).catch(()=>{
                    this.internalData=null;
                    this.$timeout(()=>{
                        this.config.isLoading=false;
                        this.config.isSuccess=false;
                        this.config.isFailed=true;
                    }).then(()=>{
                        ko();
                    });
                });


            });
        });
    }
}

export class Service extends BaseInjectable{
    
  
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
        registerDirective(m,"asyncLoader",directive);      
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