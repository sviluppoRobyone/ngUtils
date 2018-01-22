import * as angular from "angular";
import * as bj from "./utils/base-injectable";
import * as ngUtils from "./service";
import * as nameGenerator from "./utils/name-generator";


export var serviceName = nameGenerator.GetServiceName("AsyncLoader");

export function register(m:ng.IModule){
    m.service(serviceName,Service);    
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

   
    protected get IsLoading(){
        return this._config.isLoading;
    }

  
    protected get IsSuccess(){
        return this._config.isSuccess;
    }

   
    protected get IsFailed(){
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