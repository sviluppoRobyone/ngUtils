import * as angular from "angular";
import {BaseInjectable} from "./base-injectable";
import {ngUtilsService} from "./service";

export abstract class BaseService extends BaseInjectable {
    public static $inject: string[] = ([] as string[]).concat([ngUtilsService.serviceName]);
    get $ngUtils(): ngUtilsService {
        return this.getFromInject(ngUtilsService.serviceName);
    }
    get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
    get $q(){
        return this.$ngUtils.$q;
    }

}