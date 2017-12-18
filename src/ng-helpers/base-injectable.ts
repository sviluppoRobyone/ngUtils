

export abstract class baseInjectable{
    static $inject = ["$injector"];
    private store :any= {};
    protected args:any[]=[];
    protected getFromInject<T>(key: string) {

        if (!this.store[key])
            this.store[key] = this.$injector.get<T>(key);

        return this.store[key];

    }
    public constructor(...args){
            this.args= args;
            ["args","store"].forEach(x=>Object.defineProperty(this,x,{enumerable:false}));
    }
    get $injector(): angular.auto.IInjectorService {
        return this.store[baseInjectable.$inject.indexOf("$injector")];
    }
}