import { enumerable } from "../../utility/decorators";



export abstract class BaseInjectable{
    public static $inject = ["$injector"];

    private _store : any= {};
    private _args : any[]=[];

    @enumerable(false)
    protected getFromInject<T>(key: string) {
        if (!this._store[key])
            this._store[key] = this.$injector.get<T>(key);

        return this._store[key];

    }

    public constructor(...args){
        this._args = args;
    }

    @enumerable(false)
    protected get $injector(): angular.auto.IInjectorService {        
        return this.$injectedArgs[BaseInjectable.$inject.indexOf("$injector")];
    }
    
    @enumerable(false)
    protected get $injectedArgs(){
        return this._args;
    }
}