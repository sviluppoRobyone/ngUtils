/// <reference types="angular" />
/// <reference types="angular-ui-router" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-bootstrap" />
import * as angular from "angular";
import * as ngUtils from "../service";
import { BaseInjectable } from "./base-injectable";
export declare abstract class BaseCtrl extends BaseInjectable implements ng.IController {
    static $inject: string[];
    protected readonly $scope: angular.IScope;
    protected readonly $ngUtils: ngUtils.Service;
    protected readonly $q: angular.IQService;
    protected readonly $state: angular.ui.IStateService;
    protected readonly $stateParams: angular.ui.IStateParamsService;
    protected readonly $upload: angular.angularFileUpload.IUploadService;
    protected readonly $uibModal: angular.ui.bootstrap.IModalService;
}
