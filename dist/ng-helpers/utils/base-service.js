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
define(["require", "exports", "./base-injectable", "../service"], function (require, exports, base_injectable_1, ngUtilsService) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseService = /** @class */ (function (_super) {
        __extends(BaseService, _super);
        function BaseService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseService.prototype, "$ngUtils", {
            get: function () {
                return this.getFromInject(ngUtilsService.serviceName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "$uibModal", {
            get: function () {
                return this.$ngUtils.$uibModal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "$q", {
            get: function () {
                return this.$ngUtils.$q;
            },
            enumerable: true,
            configurable: true
        });
        BaseService.$inject = base_injectable_1.BaseInjectable.$inject.concat([ngUtilsService.serviceName]);
        return BaseService;
    }(base_injectable_1.BaseInjectable));
    exports.BaseService = BaseService;
});
//# sourceMappingURL=base-service.js.map