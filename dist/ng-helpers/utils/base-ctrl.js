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
define(["require", "exports", "angular", "../service", "./base-injectable", "../../utility/decorators"], function (require, exports, angular, ngUtils, base_injectable_1, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseCtrl = /** @class */ (function (_super) {
        __extends(BaseCtrl, _super);
        function BaseCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseCtrl.prototype, "$scope", {
            get: function () {
                return this.$injectedArgs[BaseCtrl.$inject.indexOf("$scope")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$ngUtils", {
            get: function () {
                return this.$injectedArgs[BaseCtrl.$inject.indexOf(ngUtils.serviceName)];
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
        Object.defineProperty(BaseCtrl.prototype, "$state", {
            get: function () {
                return this.$ngUtils.$state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$stateParams", {
            get: function () {
                return this.$ngUtils.$stateParams;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$upload", {
            get: function () {
                return this.$ngUtils.$Upload;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$uibModal", {
            get: function () {
                return this.$ngUtils.$uibModal;
            },
            enumerable: true,
            configurable: true
        });
        BaseCtrl.$inject = base_injectable_1.BaseInjectable.$inject.concat(["$scope", ngUtils.serviceName]);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$scope", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", ngUtils.Service),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$ngUtils", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$q", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$state", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$stateParams", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$upload", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseCtrl.prototype, "$uibModal", null);
        return BaseCtrl;
    }(base_injectable_1.BaseInjectable));
    exports.BaseCtrl = BaseCtrl;
});
//# sourceMappingURL=base-ctrl.js.map