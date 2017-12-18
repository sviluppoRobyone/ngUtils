/// <reference types="angular" />
/// <reference types="angular-ui-router" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-bootstrap" />
import * as angular from "angular";
import { ngUtilsService } from "./service";
import { baseInjectable } from "./base-injectable";
import * as fv from "./file-viewer";
export declare class BaseCtrl extends baseInjectable {
    static $inject: string[];
    readonly $scope: angular.IScope;
    readonly $ngUtils: ngUtilsService;
    readonly $q: angular.IQService;
    readonly $state: angular.ui.IStateService;
    readonly $stateParams: angular.ui.IStateParamsService;
    readonly $upload: angular.angularFileUpload.IUploadService;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    readonly $fileViewer: fv.fileViewerService;
}
