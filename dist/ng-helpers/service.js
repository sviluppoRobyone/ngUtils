define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ngUtilsService = /** @class */ (function () {
        function ngUtilsService() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.args = null;
            this.store = {};
            this.args = args;
            Object.defineProperty(this, "args", { enumerable: false });
        }
        ngUtilsService.prototype.getFromInject = function (key) {
            if (!this.store[key])
                this.store[key] = this.$injector.get(key);
            return this.store[key];
        };
        Object.defineProperty(ngUtilsService.prototype, "$injector", {
            get: function () {
                return this.args[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$rootScope", {
            get: function () {
                return this.getFromInject("$rootScope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$http", {
            get: function () {
                return this.getFromInject("$http");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$location", {
            get: function () {
                return this.getFromInject("$location");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$routeParams", {
            get: function () {
                return this.getFromInject("$routeParams");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$filter", {
            get: function () {
                return this.getFromInject("$filter");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$route", {
            get: function () {
                return this.getFromInject("$route");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$timeout", {
            get: function () {
                return this.getFromInject("$timeout");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$ngView", {
            get: function () {
                return $("[ng-view]");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$cacheFactory", {
            get: function () {
                return this.getFromInject("$cacheFactory");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$locale", {
            get: function () {
                return this.getFromInject("$locale");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$interval", {
            get: function () {
                return this.getFromInject("$interval");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$log", {
            get: function () {
                return this.getFromInject("$log");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ngUtilsService.prototype, "$sce", {
            get: function () {
                return this.getFromInject("$sce");
            },
            enumerable: true,
            configurable: true
        });
        ngUtilsService.prototype.manageAjaxLoading = function (before, ajax, after) {
            var _this = this;
            var qBefore = this.$q.defer();
            var qAjax = this.$q.defer();
            var qAfter = this.$q.defer();
            var doBefore = function () {
                _this.$timeout(function () {
                    before && before();
                }).then(function () {
                    qBefore.resolve();
                });
            };
            var doAfter = function () {
                _this.$timeout(function () {
                    after && after();
                }).then(function () {
                    qAfter.resolve();
                });
            };
            qBefore.promise.then(function () {
                ajax(qAjax.resolve, qAjax.reject);
            });
            qAjax.promise.then(function () {
                doAfter();
            });
            return this.$q(function (ok, ko) {
                qAfter.promise.then(function () {
                    ok();
                });
                doBefore();
            });
        };
        ngUtilsService.prototype.onScopeDispose = function ($scope) {
            var q = this.$q.defer();
            $scope.$on("$destroy", function () {
                q.resolve();
            });
            return q.promise;
        };
        ngUtilsService.serviceName = "$ngUtils";
        ngUtilsService.$inject = ["$injector"];
        return ngUtilsService;
    }());
    exports.ngUtilsService = ngUtilsService;
});
//# sourceMappingURL=service.js.map