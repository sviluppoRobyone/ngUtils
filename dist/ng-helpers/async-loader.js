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
define(["require", "exports", "./utils/base-injectable", "./utils/name-generator", "../utility/decorators"], function (require, exports, bj, nameGenerator, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = nameGenerator.GetServiceName("asyncLoaderFactory");
    function register(m) {
        m.service(exports.serviceName, Service);
    }
    exports.register = register;
    var Config = /** @class */ (function () {
        function Config() {
            this.args = null;
            this._isLoading = false;
            this._isSuccess = false;
            this._isFailed = false;
            this.GetDataFn = null;
        }
        return Config;
    }());
    exports.Config = Config;
    var AsyncLoader = /** @class */ (function () {
        function AsyncLoader(c) {
            this._config = null;
            this.Data = null;
            this.config.args = c;
        }
        Object.defineProperty(AsyncLoader.prototype, "$q", {
            get: function () {
                return this.config.args.$q;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "$timeout", {
            get: function () {
                return this.config.args.$timeout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "config", {
            get: function () {
                return this._config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsLoading", {
            get: function () {
                return this.config._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsSuccess", {
            get: function () {
                return this.config._isSuccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsFailed", {
            get: function () {
                return this.config._isFailed;
            },
            enumerable: true,
            configurable: true
        });
        AsyncLoader.prototype.Update = function () {
            var _this = this;
            return this.$q(function (ok) {
                _this.$timeout(function () {
                    _this.config._isLoading = true;
                }).then(function () {
                    _this.config.args.Fn().then(function (data) {
                        _this.Data = data;
                        _this.$timeout(function () {
                            _this.config._isLoading = false;
                            _this.config._isSuccess = true;
                            _this.config._isFailed = false;
                        }).then(function () {
                            ok();
                        });
                    }).catch(function () {
                        _this.$timeout(function () {
                            _this.config._isLoading = false;
                            _this.config._isSuccess = true;
                            _this.config._isFailed = false;
                        }).then(function () {
                            ok();
                        });
                    });
                });
            });
        };
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], AsyncLoader.prototype, "$q", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], AsyncLoader.prototype, "$timeout", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], AsyncLoader.prototype, "config", null);
        __decorate([
            decorators_1.enumerable(true),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], AsyncLoader.prototype, "IsLoading", null);
        __decorate([
            decorators_1.enumerable(true),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], AsyncLoader.prototype, "IsSuccess", null);
        __decorate([
            decorators_1.enumerable(true),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], AsyncLoader.prototype, "IsFailed", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], AsyncLoader.prototype, "Update", null);
        return AsyncLoader;
    }());
    exports.AsyncLoader = AsyncLoader;
    var Service = /** @class */ (function (_super) {
        __extends(Service, _super);
        function Service() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Service.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
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
        Service.prototype.Create = function (f) {
            return new AsyncLoader({
                $q: this.$q,
                $timeout: this.$timeout,
                Fn: f
            });
        };
        return Service;
    }(bj.BaseInjectable));
    exports.Service = Service;
});
//# sourceMappingURL=async-loader.js.map