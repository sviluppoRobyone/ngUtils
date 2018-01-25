export class BaseObj{
    public get _className(){
        return (<any>this).constructor.name;
    }   
    
}