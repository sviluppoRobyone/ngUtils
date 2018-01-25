export class BaseObj{
    protected get _className(){
        return (<any>this).constructor.name;
    } 
    protected get _constructor(){
        return (<any>this).constructor;
    }  
    
}