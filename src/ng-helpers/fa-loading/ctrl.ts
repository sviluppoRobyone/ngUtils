import {BaseCtrl} from "../base-ctrl";
export class Ctrl extends BaseCtrl{

    get IsLoading(): boolean {
        return !!this.$scope["isLoading"];
    }
}