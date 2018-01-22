export abstract class BaseInjectable{
    public static $inject = ["$injector"];

   
    private _store : any= {};
  
    private _args : any[]=[];

   
    protected getFromInject<T>(key: string) {
        if (!this._store[key])
            this._store[key] = this.$injector.get<T>(key);

        return this._store[key] as T;

    }

    public constructor(...args){
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
}