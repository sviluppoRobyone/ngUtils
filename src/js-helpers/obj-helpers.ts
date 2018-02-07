export default class BaseObj{
    protected get _className():string{
        return this._constructor.name;
    } 
    protected get _constructor():any{
        return (<any>this).constructor;
    }     
}