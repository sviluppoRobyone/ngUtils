import * as angular from "angular";
import { BaseCtrl } from "./base-ctrl";
export abstract class BaseCtrlForDirective extends BaseCtrl {
    static $inject: string[] = BaseCtrl.$inject.concat(["$attrs"]);

    get $attrs():ng.IAttributes{
        return this.$injectedArgs[BaseCtrlForDirective.$inject.indexOf("$attrs")];
    }
}