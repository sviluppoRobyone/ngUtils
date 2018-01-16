var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "../../utility/decorators"], function (require, exports, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseInjectable = /** @class */ (function () {
        function BaseInjectable() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._store = {};
            this._args = [];
            this._args = args;
        }
        BaseInjectable.prototype.getFromInject = function (key) {
            if (!this._store[key])
                this._store[key] = this.$injector.get(key);
            return this._store[key];
        };
        Object.defineProperty(BaseInjectable.prototype, "$injector", {
            get: function () {
                return this.$injectedArgs[BaseInjectable.$inject.indexOf("$injector")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$injectedArgs", {
            get: function () {
                return this._args;
            },
            enumerable: true,
            configurable: true
        });
        BaseInjectable.$inject = ["$injector"];
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", void 0)
        ], BaseInjectable.prototype, "getFromInject", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseInjectable.prototype, "$injector", null);
        __decorate([
            decorators_1.enumerable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], BaseInjectable.prototype, "$injectedArgs", null);
        return BaseInjectable;
    }());
    exports.BaseInjectable = BaseInjectable;
});
//# sourceMappingURL=base-injectable.js.map