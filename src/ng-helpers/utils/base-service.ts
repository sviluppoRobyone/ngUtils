import * as angular from "angular";
import BaseInjectable from "./base-injectable";
import * as ngUtilsService from "../service";

export default abstract class BaseService extends BaseInjectable {
    public static $inject: string[] = BaseInjectable.$inject.concat([ngUtilsService.serviceName]);

    protected get $ngUtils(): ngUtilsService.Service {
        return this.$injectedArgs[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
    }
    
  
 

}