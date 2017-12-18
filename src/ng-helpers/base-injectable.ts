

export class baseInjectable{
   
    static $inject: string[] = [];
    args: any[] = [];
    constructor(...args:any[]) {
        this.args = args;
        Object.defineProperty(this,"args",{enumerable:false});
    }
}