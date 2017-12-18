import * as angular from "angular";
import {baseInjectable} from "./base-injectable";
import {ngUtilsService} from "./service";

export class BaseService extends baseInjectable {
    public static $inject: string[] = [ngUtilsService.serviceName];  

    get $ngUtils(): ngUtilsService {
        return this.args[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
    }
    get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
    get $q(){
        return this.$ngUtils.$q;
    }

}