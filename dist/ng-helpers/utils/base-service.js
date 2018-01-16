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
define(["require", "exports", "./base-injectable", "../service", "../../utility/decorators"], function (require, exports, base_injectable_1, ngUtilsService, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseService = /** @class */ (function (_super) {
        __extends(BaseService, _super);
        function BaseService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseService.prototype, "$ngUtils", {
            get: function () {
                return this.$injectedArgs[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
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
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", ngUtilsService.Service),
            __metadata("design:paramtypes", [])
        ], BaseService.prototype, "$ngUtils", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseService.prototype, "$uibModal", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseService.prototype, "$q", null);
        return BaseService;
    }(base_injectable_1.BaseInjectable));
    exports.BaseService = BaseService;
});
//# sourceMappingURL=base-service.js.map