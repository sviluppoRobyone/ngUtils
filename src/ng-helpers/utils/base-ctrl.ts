import * as angular from "angular";
import * as ngUtils from "../service";
import BaseInjectable from "./base-injectable";
import * as fv from "../file-viewer";
import { GetLogger } from "../log";
import { ConcatenaInject } from "../core";
GetLogger().debug("BASECTRL",ngUtils,ngUtils.serviceName,BaseInjectable.$inject);
export default abstract class BaseCtrl extends BaseInjectable implements ng.IController {
    public static $inject: string[] = ConcatenaInject(BaseInjectable.$inject,"$scope", ngUtils.serviceName);


    protected get $scope(): angular.IScope {
        return this.GetInjected("$scope");
    }

  
    protected get $ngUtils(): ngUtils.NgUtilsService {
        return this.GetInjected(ngUtils.serviceName);
    }


    
}
GetLogger().debug("BASECTRL 2",BaseCtrl);