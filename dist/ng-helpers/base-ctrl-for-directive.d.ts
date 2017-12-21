/// <reference types="angular" />
import { BaseCtrl } from "./base-ctrl";
export declare abstract class BaseCtrlForDirective extends BaseCtrl {
    static $inject: string[];
    readonly $attrs: ng.IAttributes;
}
