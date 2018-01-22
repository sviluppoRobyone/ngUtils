import { enumerable, SetNotEnumerable } from "../../utility/decorators";



export abstract class BaseInjectable{
    public static $inject = ["$injector"];

    @enumerable(false)
    private _store : any= {};
    @enumerable(false)
    private _args : any[]=[];

    @enumerable(false)
    protected getFromInject<T>(key: string) {
        if (!this._store[key])
            this._store[key] = this.$injector.get<T>(key);

        return this._store[key] as T;

    }

    public constructor(...args){
        this._args = args;
    }

    @enumerable(false)
    protected get $injector(): ng.auto.IInjectorService {        
        return this.$injectedArgs[BaseInjectable.$inject.indexOf("$injector")];
    }
    
    @enumerable(false)
    protected get $injectedArgs(){
        return this._args;
    }
}