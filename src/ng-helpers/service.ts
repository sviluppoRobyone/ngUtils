import * as angular from "angular";
import {baseInjectable} from "./base-injectable";

export class ngUtilsService extends baseInjectable {
       
    static serviceName = "$ngUtils";
    static $inject = ["$injector"];
    private store :any= {};
   
    protected getFromInject<T>(key: string) {

        if (!this.store[key])
            this.store[key] = this.$injector.get<T>(key);

        return this.store[key];

    }
    get $injector(): angular.auto.IInjectorService {
        return this.args[0];
    }
    get $rootScope(): ng.IRootScopeService {
        return this.getFromInject("$rootScope");
    }
    get $http(): ng.IHttpService {
        return this.getFromInject("$http");
    }
    get $location(): ng.ILocationService {
        return this.getFromInject("$location");
    }
    get $routeParams(): ng.route.IRouteParamsService {
        return this.getFromInject("$routeParams");
    }
    get $q(): ng.IQService {
        return this.getFromInject("$q");
    }
    get $filter(): ng.IFilterService {
        return this.getFromInject("$filter");
    }
    get $route(): ng.route.IRouteService {
        return this.getFromInject("$route");
    }
    get $timeout(): ng.ITimeoutService {
        return this.getFromInject("$timeout");
    }
    get $ngView(): JQuery {
        return $("[ng-view]");
    }
    get $cacheFactory(): ng.ICacheFactoryService {
        return this.getFromInject("$cacheFactory");
    }
    get $locale(): ng.ILocaleService {
        return this.getFromInject("$locale");
    }
    get $interval(): ng.IIntervalService {
        return this.getFromInject("$interval");
    }
    get $log(): ng.ILogService {
        return this.getFromInject("$log");
    }
    get $sce(): ng.ISCEService {
        return this.getFromInject("$sce");
    }
    get $Upload(): ng.angularFileUpload.IUploadService {
        return this.getFromInject("Upload");
    }    
    get $stateParams(): angular.ui.IStateParamsService {
        return this.getFromInject("$stateParams");
    }
    get $state(): angular.ui.IStateService {
        return this.getFromInject("$state");
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