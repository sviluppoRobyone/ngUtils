/// <reference types="angular-ui-bootstrap" />
/// <reference types="angular" />
import * as angular from "angular";
import { ngUtilsService } from "./service";
import { baseInjectable } from "./base-injectable";
export declare abstract class BaseService extends baseInjectable {
    static $inject: string[];
    readonly $ngUtils: ngUtilsService;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    readonly $q: angular.IQService;
}
