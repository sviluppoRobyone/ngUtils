/// <reference types="angular-ui-bootstrap" />
/// <reference types="angular" />
import * as angular from "angular";
import { BaseInjectable } from "./base-injectable";
import * as ngUtilsService from "../service";
export declare abstract class BaseService extends BaseInjectable {
    static $inject: string[];
    readonly $ngUtils: ngUtilsService.Service;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    readonly $q: angular.IQService;
}
