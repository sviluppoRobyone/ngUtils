var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "./utils/base-injectable", "./file-viewer", "./utils/name-generator", "./debug/debug-service", "./async-loader", "../utility/decorators"], function (require, exports, bi, fv, nameGenerator, debugService, AsyncLoader, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = nameGenerator.GetServiceName("$ngUtils");
    function register(m) {
        m.service(exports.serviceName, Service);
    }
    exports.register = register;
    var Service = /** @class */ (function (_super) {
        __extends(Service, _super);
        function Service() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Service.prototype, "$debugService", {
            get: function () {
                return this.$injectedArgs[Service.$inject.indexOf(debugService.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$rootScope", {
            get: function () {
                return this.getFromInject("$rootScope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$http", {
            get: function () {
                return this.getFromInject("$http");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$location", {
            get: function () {
                return this.getFromInject("$location");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$filter", {
            get: function () {
                return this.getFromInject("$filter");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$timeout", {
            get: function () {
                return this.getFromInject("$timeout");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$cacheFactory", {
            get: function () {
                return this.getFromInject("$cacheFactory");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$locale", {
            get: function () {
                return this.getFromInject("$locale");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$interval", {
            get: function () {
                return this.getFromInject("$interval");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$log", {
            get: function () {
                return this.getFromInject("$log");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$sce", {
            get: function () {
                return this.getFromInject("$sce");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$Upload", {
            get: function () {
                return this.getFromInject("Upload");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$stateParams", {
            get: function () {
                return this.getFromInject("$stateParams");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$state", {
            get: function () {
                return this.getFromInject("$state");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$uibModal", {
            get: function () {
                return this.getFromInject("$uibModal");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$fileViewer", {
            get: function () {
                return this.$injectedArgs[fv.serviceName];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$asyncLoader", {
            get: function () {
                return this.$injectedArgs[AsyncLoader.serviceName];
            },
            enumerable: true,
            configurable: true
        });
        Service.prototype.manageAjaxLoading = function (before, ajax, after) {
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
        Service.prototype.onScopeDispose = function ($scope) {
            var q = this.$q.defer();
            $scope.$on("$destroy", function () {
                q.resolve();
            });
            return q.promise;
        };
        Service.$inject = bi.BaseInjectable.$inject.concat([debugService.serviceName, AsyncLoader.serviceName]);
        __decorate([
            decorators_1.deprecated("Utilizza il servizio $asyncLoader anziché {name}"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Function, Function, Function]),
            __metadata("design:returntype", void 0)
        ], Service.prototype, "manageAjaxLoading", null);
        return Service;
    }(bi.BaseInjectable));
    exports.Service = Service;
});
//# sourceMappingURL=service.js.map