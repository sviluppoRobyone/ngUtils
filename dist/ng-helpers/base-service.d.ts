/// <reference types="angular-ui-bootstrap" />
/// <reference types="angular" />
import * as angular from "angular";
import { BaseInjectable } from "./base-injectable";
import { ngUtilsService } from "./service";
export declare abstract class BaseService extends BaseInjectable {
    static $inject: string[];
    readonly $ngUtils: ngUtilsService;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    readonly $q: angular.IQService;
}
