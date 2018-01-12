/// <reference types="angular" />
/// <reference types="angular-ui-router" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-bootstrap" />
import * as angular from "angular";
import * as ngUtilsService from "../service";
import { BaseInjectable } from "./base-injectable";
export declare abstract class BaseCtrl extends BaseInjectable {
    static $inject: string[];
    readonly $scope: angular.IScope;
    readonly $ngUtils: ngUtilsService.Service;
    readonly $q: angular.IQService;
    readonly $state: angular.ui.IStateService;
    readonly $stateParams: angular.ui.IStateParamsService;
    readonly $upload: angular.angularFileUpload.IUploadService;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
}
