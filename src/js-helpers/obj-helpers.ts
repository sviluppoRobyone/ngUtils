export class BaseObj{
    protected get _className(){
        return (<any>this).constructor.name;
    } 
    protected get _constructor(){
        return (<any>this).constructor;
    }  
    
}
export module arrays{
    export function describeArray(a:any[]):string[]{
        return a.map(x=>{
           return (typeof (x) ===typeof ({}) ? x.constructor.name:typeof(x))+"";
        });
    }
}