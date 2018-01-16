import * as angular from "angular";
import * as ngUtils from "../service";
import {BaseInjectable} from "./base-injectable";
import * as fv from "../file-viewer";
import { enumerable } from "../../utility/decorators";
export abstract class BaseCtrl extends BaseInjectable implements ng.IController {
    public static $inject: string[] = BaseInjectable.$inject.concat(["$scope", ngUtils.serviceName]);

    @enumerable(false)
    protected get $scope(): angular.IScope {
        return this.$injectedArgs[BaseCtrl.$inject.indexOf("$scope")];
    }

    @enumerable(false)
    protected get $ngUtils(): ngUtils.Service {
        return this.$injectedArgs[BaseCtrl.$inject.indexOf(ngUtils.serviceName)];
    }

    @enumerable(false)
    protected get $q() {
        return this.$ngUtils.$q;
    }

    @enumerable(false)
    protected get $state(){
        return this.$ngUtils.$state;
    }

    @enumerable(false)
    protected get $stateParams(){
        return this.$ngUtils.$stateParams;
    }

    @enumerable(false)
    protected get $upload(){
        return this.$ngUtils.$Upload;
    }
    
    @enumerable(false)
    protected get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
}