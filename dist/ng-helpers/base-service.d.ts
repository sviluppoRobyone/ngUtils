import { ngUtilsService } from "./service";
import { baseInjectable } from "./base-injectable";
export declare abstract class BaseService extends baseInjectable {
    static $inject: string[];
    readonly $ngUtils: ngUtilsService;
}
