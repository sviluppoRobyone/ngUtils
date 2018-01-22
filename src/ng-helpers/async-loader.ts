import * as angular from "angular";
import * as bj from "./utils/base-injectable";
import * as ngUtils from "./service";
import * as nameGenerator from "./utils/name-generator";
import { enumerable } from "../utility/decorators";


export var serviceName = nameGenerator.GetServiceName("asyncLoaderFactory");

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
    public _isLoading :boolean=false;
    public _isSuccess: boolean=false;
    public _isFailed: boolean=false;
    public GetDataFn:IGetDataFunction<T> =null;
}

export class AsyncLoader<T> {

    @enumerable(false)
    protected get $q(){
        return this.config.args.$q;
    }
    @enumerable(false)
    protected get $timeout(){
        return this.config.args.$timeout;
    }

    @enumerable(false)
    protected get config(){
        return this._config;
    }
    private _config: Config<T>=null;

    @enumerable(true)
    protected get IsLoading(){
        return this.config._isLoading;
    }
    @enumerable(true)
    protected get IsSuccess(){
        return this.config._isSuccess;
    }
    @enumerable(true)
    protected get IsFailed(){
        return this.config._isFailed;
    }

    protected Data :T=null;
    constructor(c:IAsyncLoaderConstructor<T>){
       this.config.args=c;
       
    }

    @enumerable(false)
    Update(){
        return this.$q(ok=>{
            
            this.$timeout(()=>{
                this.config._isLoading=true;
            }).then(()=>{
                this.$q<T>(this.config.args.Fn).then(data=>{ 

                    this.Data=data;
                    this.$timeout(()=>{
                        this.config._isLoading=false;
                        this.config._isSuccess=true;
                        this.config._isFailed=false;
                    }).then(()=>{
                        ok();
                    });
                    
                }).catch(()=>{
                   
                    this.$timeout(()=>{
                        this.config._isLoading=false;
                        this.config._isSuccess=true;
                        this.config._isFailed=false;
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