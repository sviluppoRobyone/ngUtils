import {ngUtilsService} from "./service";
import {baseInjectable} from "./base-injectable";
export class BaseService extends baseInjectable {
    public static $inject: string[] = [ngUtilsService.serviceName];  

    get $ngUtils(): ngUtilsService {
        return this.args[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
    } 

}