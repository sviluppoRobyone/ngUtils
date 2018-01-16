import {BaseCtrl} from "../utils/base-ctrl"
import { enumerable } from "../../utility/decorators";
export var ErrorKey="ModalErrorData";
export class Ctrl extends BaseCtrl{
    public static $inject: string[] =BaseCtrl.$inject.concat([ErrorKey]);

    @enumerable(true)
    public get Errors() {
        return this.$injectedArgs[Ctrl.$inject.indexOf(ErrorKey)];
    }
}