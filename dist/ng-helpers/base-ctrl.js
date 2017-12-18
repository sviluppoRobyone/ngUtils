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
define(["require", "exports", "./service", "./base-injectable"], function (require, exports, service_1, base_injectable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseCtrl = /** @class */ (function (_super) {
        __extends(BaseCtrl, _super);
        function BaseCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseCtrl.prototype, "$scope", {
            get: function () {
                return this.args[BaseCtrl.$inject.indexOf("$scope")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$ngUtils", {
            get: function () {
                return this.args[BaseCtrl.$inject.indexOf(service_1.ngUtilsService.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$q", {
            get: function () {
                return this.$ngUtils.$q;
            },
            enumerable: true,
            configurable: true
        });
        BaseCtrl.$inject = ["$scope", service_1.ngUtilsService.serviceName];
        return BaseCtrl;
    }(base_injectable_1.baseInjectable));
    exports.BaseCtrl = BaseCtrl;
});
//# sourceMappingURL=base-ctrl.js.map