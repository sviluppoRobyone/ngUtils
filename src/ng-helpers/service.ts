import * as angular from "angular";
import * as bi from "./utils/base-injectable";
import * as fv from "./file-viewer";
import * as nameGenerator from "./utils/name-generator";
import * as debugService from "./debug/debug-service";
export var serviceName=nameGenerator.GetServiceName("$ngUtils");

export function register(m:ng.IModule){
    m.service(serviceName,Service);
}
export class Service extends bi.BaseInjectable {
    public static $inject=bi.BaseInjectable.$inject.concat([debugService.serviceName]);

    public get $debugService():debugService.Service{
        return this.$injectedArgs[Service.$inject.indexOf(debugService.serviceName)];
    }
    public get $rootScope(): ng.IRootScopeService {
        return this.getFromInject("$rootScope");
    }
    public get $http(): ng.IHttpService {
        return this.getFromInject("$http");
    }
    public get $location(): ng.ILocationService {
        return this.getFromInject("$location");
    }
    public get $q(): ng.IQService {
        return this.getFromInject("$q");
    }
    public get $filter(): ng.IFilterService {
        return this.getFromInject("$filter");
    }
    public get $timeout(): ng.ITimeoutService {
        return this.getFromInject("$timeout");
    }
    public get $ngView(): JQuery {
        return $("[ng-view]");
    }
    public get $cacheFactory(): ng.ICacheFactoryService {
        return this.getFromInject("$cacheFactory");
    }
    public get $locale(): ng.ILocaleService {
        return this.getFromInject("$locale");
    }
    public get $interval(): ng.IIntervalService {
        return this.getFromInject("$interval");
    }
    public get $log(): ng.ILogService {
        return this.getFromInject("$log");
    }
    public get $sce(): ng.ISCEService {
        return this.getFromInject("$sce");
    }
    public get $Upload(): ng.angularFileUpload.IUploadService {
        return this.getFromInject("Upload");
    }    
    public get $stateParams(): angular.ui.IStateParamsService {
        return this.getFromInject("$stateParams");
    }
    public get $state(): angular.ui.IStateService {
        return this.getFromInject("$state");
    }
    public get $uibModal():angular.ui.bootstrap.IModalService{
        return this.getFromInject("$uibModal");
    }
    public get $fileViewer():fv.fileViewerService{        
        return this.$injectedArgs[fv.serviceName];
    }
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