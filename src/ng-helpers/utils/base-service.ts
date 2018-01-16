import * as angular from "angular";
import {BaseInjectable} from "./base-injectable";
import * as ngUtilsService from "../service";
import { enumerable } from "../../utility/decorators";

export abstract class BaseService extends BaseInjectable {
    public static $inject: string[] = BaseInjectable.$inject.concat([ngUtilsService.serviceName]);

    @enumerable(false)
    protected get $ngUtils(): ngUtilsService.Service {
        return this.$injectedArgs[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
    }
    
    @enumerable(false)
    protected get $uibModal(){
        return this.$ngUtils.$uibModal;
    }

    @enumerable(false)
    protected get $q(){
        return this.$ngUtils.$q;
    }

}