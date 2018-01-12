import * as angular from "angular";
import {BaseInjectable} from "./base-injectable";
import * as ngUtilsService from "../service";

export abstract class BaseService extends BaseInjectable {
    public static $inject: string[] = BaseInjectable.$inject.concat([ngUtilsService.serviceName]);
    
    get $ngUtils(): ngUtilsService.Service {
        return this.$injectedArgs[ngUtilsService.serviceName];
    }
    get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
    get $q(){
        return this.$ngUtils.$q;
    }

}