import * as angular from "angular";
import {ngUtilsService} from "./service";
import {BaseInjectable} from "./base-injectable";
import * as fv from "./file-viewer";
export abstract class BaseCtrl extends BaseInjectable {
    static $inject: string[] = ([] as string[]).concat(["$scope", ngUtilsService.serviceName]);
    
    get $scope(): angular.IScope {
        return this.args[BaseCtrl.$inject.indexOf("$scope")];
    }
    get $ngUtils(): ngUtilsService {
        return this.args[BaseCtrl.$inject.indexOf(ngUtilsService.serviceName)];
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