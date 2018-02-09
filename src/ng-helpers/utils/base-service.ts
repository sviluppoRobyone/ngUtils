import * as angular from "angular";
import BaseInjectable from "./base-injectable";
import * as ngUtilsService from "../service";
import { ConcatenaInject } from "../core";

export default abstract class BaseService extends BaseInjectable {
    public static $inject: string[] = ConcatenaInject( BaseInjectable.$inject,ngUtilsService.serviceName);

    protected get $ngUtils(): ngUtilsService.NgUtilsService {
        return this.GetInjected(ngUtilsService.serviceName);
    }
}