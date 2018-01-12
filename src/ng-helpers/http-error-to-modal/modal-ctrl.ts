import {BaseCtrl} from "../utils/base-ctrl"
export class ModalController extends BaseCtrl{
    static $inject: string[] =BaseCtrl.$inject.concat(["errors", "$injector"]);

    get Errors() {
        return this.args[ModalController.$inject.indexOf("errors")];
    }
}