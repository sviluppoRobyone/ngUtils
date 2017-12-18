define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseInjectable = /** @class */ (function () {
        function BaseInjectable() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = this;
            this.store = {};
            this.args = [];
            this.args = args;
            ["args", "store"].forEach(function (x) { return Object.defineProperty(_this, x, { enumerable: false }); });
        }
        BaseInjectable.prototype.getFromInject = function (key) {
            if (!this.store[key])
                this.store[key] = this.$injector.get(key);
            return this.store[key];
        };
        Object.defineProperty(BaseInjectable.prototype, "$injector", {
            get: function () {
                return this.store[BaseInjectable.$inject.indexOf("$injector")];
            },
            enumerable: true,
            configurable: true
        });
        BaseInjectable.$inject = ["$injector"];
        return BaseInjectable;
    }());
    exports.BaseInjectable = BaseInjectable;
});
//# sourceMappingURL=base-injectable.js.map