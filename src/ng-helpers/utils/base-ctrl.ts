import * as angular from "angular";
import * as ngUtils from "../service";
import {BaseInjectable} from "./base-injectable";
import * as fv from "../file-viewer";
export abstract class BaseCtrl extends BaseInjectable {
    static $inject: string[] = BaseInjectable.$inject.concat(["$scope", ngUtils.serviceName]);
    
    get $scope(): angular.IScope {
        return this.$injectedArgs[BaseCtrl.$inject.indexOf("$scope")];
    }
    get $ngUtils(): ngUtils.Service {
        return this.$injectedArgs[BaseCtrl.$inject.indexOf(ngUtils.serviceName)];
    }
    get $q() {
        return this.$ngUtils.$q;
    }
    get $state(){
        return this.$ngUtils.$state;
    }
    get $stateParams(){
        return this.$ngUtils.$stateParams;
    }
    get $upload(){
        return this.$ngUtils.$Upload;
    }
    get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
}