import BaseCtrl from "../utils/base-ctrl";
export var ErrorKey="ModalErrorData";
export class Ctrl extends BaseCtrl{
    public static $inject: string[] =BaseCtrl.$inject.concat([ErrorKey]);
  
    public get Errors() {
        return this.$injectedArgs[Ctrl.$inject.indexOf(ErrorKey)];
    }
}