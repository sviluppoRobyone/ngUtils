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
    readonly $rootScope: ng.IRootScopeService;
    readonly $http: ng.IHttpService;
    readonly $location: ng.ILocationService;
    readonly $q: ng.IQService;
    readonly $filter: ng.IFilterService;
    readonly $timeout: ng.ITimeoutService;
    readonly $ngView: JQuery;
    readonly $cacheFactory: ng.ICacheFactoryService;
    readonly $locale: ng.ILocaleService;
    readonly $interval: ng.IIntervalService;
    readonly $log: ng.ILogService;
    readonly $sce: ng.ISCEService;
    readonly $Upload: ng.angularFileUpload.IUploadService;
    readonly $stateParams: angular.ui.IStateParamsService;
    readonly $state: angular.ui.IStateService;
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    readonly $fileViewer: fv.fileViewerService;
    readonly $asyncLoader: AsyncLoader.Service;
    manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function): angular.IPromise<{}>;
    onScopeDispose($scope: ng.IScope): angular.IPromise<{}>;
}
