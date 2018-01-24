import * as angular from "angular";
import * as ngUtils from "../service";
import BaseInjectable from "./base-injectable";
import * as fv from "../file-viewer";
export default abstract class BaseCtrl extends BaseInjectable implements ng.IController {
    public static $inject: string[] = BaseInjectable.$inject.concat(["$scope", ngUtils.serviceName]);


    protected get $scope(): angular.IScope {
        return this.$injectedArgs[BaseCtrl.$inject.indexOf("$scope")];
    }

  
    protected get $ngUtils(): ngUtils.Service {
        return this.$injectedArgs[BaseCtrl.$inject.indexOf(ngUtils.serviceName)];
    }


    protected get $q() {
        return this.$ngUtils.$q;
    }


    protected get $state(){
        return this.$ngUtils.$state;
    }

    
    protected get $stateParams(){
        return this.$ngUtils.$stateParams;
    }

   
    protected get $upload(){
        return this.$ngUtils.$Upload;
    }
    
    
    protected get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
}