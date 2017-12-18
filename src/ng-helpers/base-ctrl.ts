import * as angular from "angular";
import {ngUtilsService} from "./service";

export class BaseCtrl {
    static $inject: string[] = ["$scope", ngUtilsService.serviceName];
    args: any[] = [];
    constructor(...args:any[]) {
        this.args = args;
        Object.defineProperty(this,"args",{enumerable:false});
    }
    get $scope(): ng.IScope {
        return this.args[BaseCtrl.$inject.indexOf("$scope")];
    }

    get $ngUtils(): ngUtilsService {
        return this.args[BaseCtrl.$inject.indexOf(ngUtilsService.serviceName)];
    }

    get $q() {
        return this.$ngUtils.$q;
    }
}