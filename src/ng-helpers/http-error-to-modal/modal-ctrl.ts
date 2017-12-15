import {BaseCtrl} from "../base-ctrl"
export class ModalController extends BaseCtrl{
    static $inject: string[] =[].concat([],BaseCtrl.$inject, ["errors", "$injector"]);

    get Errors() {
        return this.args[ModalController.$inject.indexOf("errors")];
    }
    
    constructor(...args) {
        super(...args);
       
    }
}