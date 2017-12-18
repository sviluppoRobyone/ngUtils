/// <reference types="angular" />
/// <reference types="angular-route" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-router" />
/// <reference types="angular-ui-bootstrap" />
import * as angular from "angular";
import { baseInjectable } from "./base-injectable";
import * as fv from "./file-viewer";
export declare class ngUtilsService extends baseInjectable {
    static serviceName: string;
    static $inject: string[];
    private store;
    protected getFromInject<T>(key: string): any;
    readonly $injector: angular.auto.IInjectorService;
    readonly $rootScope: ng.IRootScopeService;
    readonly $http: ng.IHttpService;
    readonly $location: ng.ILocationService;
    readonly $routeParams: ng.route.IRouteParamsService;
    readonly $q: ng.IQService;
    readonly $filter: ng.IFilterService;
    readonly $route: ng.route.IRouteService;
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
    manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function): angular.IPromise<{}>;
    onScopeDispose($scope: ng.IScope): angular.IPromise<{}>;
}
