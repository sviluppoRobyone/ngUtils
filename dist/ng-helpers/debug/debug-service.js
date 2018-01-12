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
define(["require", "exports", "../utils/base-injectable", "../utils/name-generator"], function (require, exports, bi, nameGenerator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.service(exports.serviceName, Service);
    }
    exports.register = register;
    exports.serviceName = nameGenerator.GetServiceName("debug");
    var Detectors;
    (function (Detectors) {
        Detectors.DebugName = "DEBUG";
        function IsLocalhost() {
            return window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1";
        }
        Detectors.IsLocalhost = IsLocalhost;
        function IsLocalDomain() {
            return window.location.hostname.endsWith(".local");
        }
        Detectors.IsLocalDomain = IsLocalDomain;
        function IsWindowDebugDefined() {
            return Detectors.DebugName in window;
        }
        Detectors.IsWindowDebugDefined = IsWindowDebugDefined;
        function GetWindowDebugValue() {
            if (!IsWindowDebugDefined())
                throw "[" + Detectors.DebugName + "] must be defined in window: window." + Detectors.DebugName + "=true/false;";
            return window[Detectors.DebugName];
        }
        Detectors.GetWindowDebugValue = GetWindowDebugValue;
    })(Detectors = exports.Detectors || (exports.Detectors = {}));
    var Service = /** @class */ (function (_super) {
        __extends(Service, _super);
        function Service() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.DebugStatus = false;
            _this.Updater = null;
            _this.init();
            return _this;
        }
        Object.defineProperty(Service.prototype, "$timeout", {
            get: function () {
                return this.getFromInject("$timeout");
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
        Object.defineProperty(Service.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
            },
            enumerable: true,
            configurable: true
        });
        Service.prototype.UpdateStatus = function () {
            var _this = this;
            this.Updater().then(function (x) {
                _this.$timeout(function () {
                    _this.DebugStatus = x;
                });
            });
        };
        Service.prototype.init = function () {
            var _this = this;
            var fn = function () {
                return _this.$q.resolve(_this.updateDebugV1);
            };
            this.SetDebugUpdater(fn);
            this.$rootScope.$watch(function () {
            });
        };
        Service.prototype.SetDebugUpdater = function (f) {
            this.Updater = f;
        };
        Object.defineProperty(Service.prototype, "updateDebugV1", {
            get: function () {
                return Detectors.IsWindowDebugDefined() ? Detectors.GetWindowDebugValue() : (Detectors.IsLocalhost() || Detectors.IsLocalDomain());
            },
            enumerable: true,
            configurable: true
        });
        return Service;
    }(bi.BaseInjectable));
    exports.Service = Service;
});
//# sourceMappingURL=debug-service.js.map