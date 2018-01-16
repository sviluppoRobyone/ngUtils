import * as angular from "angular";
import { BaseCtrl } from "./base-ctrl";
import { enumerable } from "../../utility/decorators";
export abstract class BaseCtrlForDirective extends BaseCtrl {
    public static $inject: string[] = BaseCtrl.$inject.concat(["$attrs"]);
    
    @enumerable(false)
    protected get $attrs():ng.IAttributes{
        return this.$injectedArgs[BaseCtrlForDirective.$inject.indexOf("$attrs")];
    }
}