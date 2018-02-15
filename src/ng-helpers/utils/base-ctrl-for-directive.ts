import * as angular from "angular";
import  BaseCtrl  from "./base-ctrl";
import { ConcatenaInject } from "../core";
import { GetLogger } from "../log";
export default abstract class BaseCtrlForDirective extends BaseCtrl {
    
    public static $inject: string[] = ConcatenaInject(BaseCtrl.$inject,"$attrs","$element");    
    
    protected get $attrs():ng.IAttributes{
        return this.GetInjected("$attrs");
    }
    
    protected get $element():JQuery{
        return this.GetInjected("$element");
    }
}
GetLogger().debug("BaseCtrlForDirective has been required");