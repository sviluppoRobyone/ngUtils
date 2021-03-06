import * as angular from "angular";
import * as ngUtils from "./service";
import * as nameGenerator from "./utils/name-generator";
import  BaseInjectable  from "./utils/base-injectable";
import { registerService, registerDirective } from "./core";
import BaseCtrlForDirective from "./utils/base-ctrl-for-directive";


export var serviceName = nameGenerator.GetServiceName("AsyncLoader");

export default function register(m:ng.IModule){
    
    registerService(m,serviceName,AsyncLoaderService);
    
    directive.register(m);
}

export interface IGetDataFunction<T>{
    (resolve: ng.IQResolveReject<T>, reject: ng.IQResolveReject<any>):void;
}
export class Config<T>{
   
    public isLoading :boolean=false;
    public isSuccess: boolean=false;
    public isFailed: boolean=false;
    public dafaultValue:T=null;
    public successCount:number=0;
    public GetDataFn:IGetDataFunction<T> =null;
}
interface AsyncLoaderFactory{
    <T>():AsyncLoader<T>
}
export class AsyncLoader<T> extends BaseInjectable {

    private internalData :T=null;
    private config: Config<T>=new Config<T>();    
   
   
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

    SetDataFunction(fn:IGetDataFunction<T>,defaultValue:T=null){
        this.config.GetDataFn=fn;
        this.config.dafaultValue=defaultValue;  
        if (this.config.dafaultValue!=null){
            this.internalData=this.config.dafaultValue;
        }    
    }
    constructor(...args){
        super(...args);

       
       ["internalData","config"].forEach(x=>{
        Object.defineProperty(this,x,{enumerable:false});
        });
    }

    private assignValue(data:T){
        if (data instanceof Array && this.internalData instanceof Array)
        {
            this.internalData.splice(0,this.internalData.length);
            this.internalData.push(...data);
        }
        else{
            this.internalData=data;
        }

    }
    Update(){
        return this.$q((ok,ko)=>{
            
            this.$timeout(()=>{
                this.config.isLoading=true;
                this.config.isSuccess=false;
                this.config.isFailed=false;
            }).then(()=>{
                this.$q<T>(this.config.GetDataFn).then(data=>{ 
                    
                    this.assignValue(data);
                    
                    this.$timeout(()=>{
                        this.config.successCount++;
                        this.config.isLoading=false;
                        this.config.isSuccess=true;
                        this.config.isFailed=false;
                    }).then(()=>{
                        ok();
                    });
                    
                }).catch(()=>{
                    this.internalData=this.config.dafaultValue;
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

export class AsyncLoaderService extends BaseInjectable{

   
    public Create<T>(f:IGetDataFunction<T>,initValue:T=null) :AsyncLoader<T>{
       
       var loader=new AsyncLoader<T>(...this.$injectedArgs);    

       loader.SetDataFunction(f,initValue);
       return loader;
    }
}

module directive{
    export var directiveName=nameGenerator.GetDirectiveName("asyncLoader");
    export function register(m:ng.IModule){
        registerDirective(m,directiveName,directive);      
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
            controller:AsyncLoaderDirectiveCtrl,
            controllerAs:"Ctrl",
            transclude:{
                loading:"loading",
                content:"content"
            }

        } as ng.IDirective;
    }

    class AsyncLoaderDirectiveCtrl extends BaseCtrlForDirective {
      
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