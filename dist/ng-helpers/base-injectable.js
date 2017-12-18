define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseInjectable = /** @class */ (function () {
        function baseInjectable() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.args = [];
            this.args = args;
            Object.defineProperty(this, "args", { enumerable: false });
        }
        baseInjectable.$inject = [];
        return baseInjectable;
    }());
    exports.baseInjectable = baseInjectable;
});
//# sourceMappingURL=base-injectable.js.map