/// <reference types="angular" />
import { BaseCtrl } from "./base-ctrl";
export declare abstract class BaseCtrlForDirective extends BaseCtrl {
    static $inject: string[];
    protected readonly $attrs: ng.IAttributes;
}
