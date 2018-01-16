/// <reference types="angular" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-router" />
/// <reference types="angular-ui-bootstrap" />
import * as angular from "angular";
import * as bi from "./utils/base-injectable";
import * as fv from "./file-viewer";
import * as debugService from "./debug/debug-service";
export declare var serviceName: string;
import * as AsyncLoader from "./async-loader";
export declare function register(m: ng.IModule): void;
export declare class Service extends bi.BaseInjectable {
    static $inject: string[];
    readonly $debugService: debugService.Service;
    readonly $rootScope: angular.IRootScopeService;
    readonly $http: angular.IHttpService;
    readonly $location: angular.ILocationService;
    readonly $q: angular.IQService;
    readonly $filter: angular.IFilterService;
    readonly $timeout: angular.ITimeoutService;
    readonly $cacheFactory: angular.ICacheFactoryService;
    readonly $locale: angular.ILocaleService;
    readonly $interval: angular.IIntervalService;
    readonly $log: angular.ILogService;
    readonly $sce: angular.ISCEService;
    readonly $Upload: angular.angularFileUpload.IUploadService;
    readonly $stateParams: angular.ui.IStateParamsService;
    readonly $state: angular.ui.IStateService;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    readonly $fileViewer: fv.fileViewerService;
    readonly $asyncLoader: AsyncLoader.Service;
    manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function): angular.IPromise<{}>;
    onScopeDispose($scope: ng.IScope): angular.IPromise<{}>;
}
