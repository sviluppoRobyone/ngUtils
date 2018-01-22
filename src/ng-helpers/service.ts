import * as angular from "angular";
import * as bi from "./utils/base-injectable";
import * as fv from "./file-viewer";
import * as nameGenerator from "./utils/name-generator";
import * as debugService from "./debug/debug-service";
export var serviceName=nameGenerator.GetServiceName("$ngUtils");
import * as AsyncLoader from "./async-loader";

export function register(m:ng.IModule){
    m.service(serviceName,Service);
}
export class Service extends bi.BaseInjectable {
    public static $inject=bi.BaseInjectable.$inject.concat([debugService.serviceName,AsyncLoader.serviceName]);

    public get $debugService():debugService.Service{
        return this.$injectedArgs[Service.$inject.indexOf(debugService.serviceName)];
    }
    public get $rootScope(){
        return this.getFromInject<ng.IRootScopeService>("$rootScope");
    }
    public get $http()  {
        return this.getFromInject<ng.IHttpService>("$http");
    }
    public get $location()  {
        return this.getFromInject<ng.ILocationService>("$location");
    }
    public get $q() {
        return this.getFromInject<ng.IQService>("$q");
    }
    public get $filter() {
        return this.getFromInject<ng.IFilterService>("$filter");
    }
    public get $timeout() {
        return this.getFromInject<ng.ITimeoutService>("$timeout");
    }
    public get $cacheFactory() {
        return this.getFromInject<ng.ICacheFactoryService>("$cacheFactory");
    }
    public get $locale(){
        return this.getFromInject<ng.ILocaleService>("$locale");
    }
    public get $interval() {
        return this.getFromInject<ng.IIntervalService>("$interval");
    }
    public get $log() {
        return this.getFromInject<ng.ILogService>("$log");
    }
    public get $sce() {
        return this.getFromInject<ng.ISCEService>("$sce");
    }
    public get $Upload() {
        return this.getFromInject<ng.angularFileUpload.IUploadService>("Upload");
    }    
    public get $stateParams() {
        return this.getFromInject<ng.ui.IStateParamsService>("$stateParams");
    }
    public get $state() {
        return this.getFromInject<ng.ui.IStateService>("$state");
    }
    public get $uibModal(){
        return this.getFromInject<ng.ui.bootstrap.IModalService>("$uibModal");
    }
    public get $fileViewer():fv.fileViewerService{        
        return this.$injectedArgs[fv.serviceName];
    }
    public get $asyncLoader():AsyncLoader.Service{
        return this.$injectedArgs[AsyncLoader.serviceName];
    }

    ///@deprecated
    manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function) {

        var qBefore = this.$q.defer();
        var qAjax = this.$q.defer();
        var qAfter = this.$q.defer();

        var doBefore = () => {
            this.$timeout(() => {
                before && before();
            }).then(() => {
                qBefore.resolve();
            });
        }
        var doAfter = () => {
            this.$timeout(() => {
                after && after();
            }).then(() => {
                qAfter.resolve();
            });
        }
        qBefore.promise.then(() => {
            ajax(qAjax.resolve, qAjax.reject);
        });
        qAjax.promise.then(() => {
            doAfter();
        });

        return this.$q((ok, ko) => {
            qAfter.promise.then(() => {
                ok();
            });
            doBefore();
        });
    }

    onScopeDispose($scope: ng.IScope) {
        var q = this.$q.defer();
        $scope.$on("$destroy", () => {
            q.resolve();
        });
        return q.promise;
    }


}