import * as angular from "angular";
import {BaseInjectable} from "./base-injectable";
import * as ngUtilsService from "../service";

export abstract class BaseService extends BaseInjectable {
    public static $inject: string[] = BaseInjectable.$inject.concat([ngUtilsService.serviceName]);

    protected get $ngUtils(): ngUtilsService.Service {
        return this.$injectedArgs[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
    }
    
  
    protected get $uibModal(){
        return this.$ngUtils.$uibModal;
    }

 
    protected get $q(){
        return this.$ngUtils.$q;
    }

}