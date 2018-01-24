import * as angular from "angular";
import  BaseCtrl  from "./base-ctrl";
export default abstract class BaseCtrlForDirective extends BaseCtrl {
    
    public static $inject: string[] = BaseCtrl.$inject.concat(["$attrs"]);    
    
    protected get $attrs():ng.IAttributes{
        return this.$injectedArgs[BaseCtrlForDirective.$inject.indexOf("$attrs")];
    }
}