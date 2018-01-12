import {BaseCtrl} from "../utils/base-ctrl"
export class ModalController extends BaseCtrl{
    static $inject: string[] =BaseCtrl.$inject.concat(["errors"]);

    get Errors() {
        return this.$injectedArgs[ModalController.$inject.indexOf("errors")];
    }
}