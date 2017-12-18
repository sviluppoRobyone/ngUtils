import * as angular from "angular";
import {ngUtilsService} from "./service";
import {baseInjectable} from "./base-injectable";
export abstract class BaseService extends baseInjectable {
    public static $inject: string[] = [ngUtilsService.serviceName||"--"];  

    get $ngUtils(): ngUtilsService {
        return this.args[BaseService.$inject.indexOf(ngUtilsService.serviceName||"--")];
    }
    get $uibModal(){
        return this.$ngUtils.$uibModal;
    }
    get $q(){
        return this.$ngUtils.$q;
    }

}