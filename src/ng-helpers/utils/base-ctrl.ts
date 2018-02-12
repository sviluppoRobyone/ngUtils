import * as angular from "angular";
import * as ngUtils from "../service";
import BaseInjectable from "./base-injectable";
import * as fv from "../file-viewer";
import { GetLogger } from "../log";
import { ConcatenaInject } from "../core";
import { GetServiceName } from "./name-generator";

export default abstract class BaseCtrl extends BaseInjectable implements ng.IController {

    public static $inject: string[] = ConcatenaInject(BaseInjectable.$inject,"$scope", GetServiceName("ngUtils"));

    protected get $scope(): angular.IScope {
        return this.GetInjected("$scope");
    }
  
    protected get $ngUtils(): ngUtils.NgUtilsService {
        return this.GetInjected(ngUtils.serviceName);
    }    
}
