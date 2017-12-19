define(["require", "exports", "./base-injectable", "./file-viewer"], function (require, exports, base_injectable_1, fv) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ngUtilsService extends base_injectable_1.BaseInjectable {
        get $rootScope() {
            return this.getFromInject("$rootScope");
        }
        get $http() {
            return this.getFromInject("$http");
        }
        get $location() {
            return this.getFromInject("$location");
        }
        get $routeParams() {
            return this.getFromInject("$routeParams");
        }
        get $q() {
            return this.getFromInject("$q");
        }
        get $filter() {
            return this.getFromInject("$filter");
        }
        get $route() {
            return this.getFromInject("$route");
        }
        get $timeout() {
            return this.getFromInject("$timeout");
        }
        get $ngView() {
            return $("[ng-view]");
        }
        get $cacheFactory() {
            return this.getFromInject("$cacheFactory");
        }
        get $locale() {
            return this.getFromInject("$locale");
        }
        get $interval() {
            return this.getFromInject("$interval");
        }
        get $log() {
            return this.getFromInject("$log");
        }
        get $sce() {
            return this.getFromInject("$sce");
        }
        get $Upload() {
            return this.getFromInject("Upload");
        }
        get $stateParams() {
            return this.getFromInject("$stateParams");
        }
        get $state() {
            return this.getFromInject("$state");
        }
        get $uibModal() {
            return this.getFromInject("$uibModal");
        }
        get $fileViewer() {
            return this.args[fv.serviceName];
        }
        manageAjaxLoading(before, ajax, after) {
            var qBefore = this.$q.defer();
            var qAjax = this.$q.defer();
            var qAfter = this.$q.defer();
            var doBefore = () => {
                this.$timeout(() => {
                    before && before();
                }).then(() => {
                    qBefore.resolve();
                });
            };
            var doAfter = () => {
                this.$timeout(() => {
                    after && after();
                }).then(() => {
                    qAfter.resolve();
                });
            };
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
        onScopeDispose($scope) {
            var q = this.$q.defer();
            $scope.$on("$destroy", () => {
                q.resolve();
            });
            return q.promise;
        }
    }
    ngUtilsService.serviceName = "$ngUtils";
    exports.ngUtilsService = ngUtilsService;
});
//# sourceMappingURL=service.js.map