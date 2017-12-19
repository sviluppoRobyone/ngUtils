define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseInjectable {
        constructor(...args) {
            this.store = {};
            this.args = [];
            this.args = args;
            ["args", "store"].forEach(x => Object.defineProperty(this, x, { enumerable: false }));
        }
        getFromInject(key) {
            if (!this.store[key])
                this.store[key] = this.$injector.get(key);
            return this.store[key];
        }
        get $injector() {
            return this.args[BaseInjectable.$inject.indexOf("$injector")];
        }
    }
    BaseInjectable.$inject = ["$injector"];
    exports.BaseInjectable = BaseInjectable;
});
//# sourceMappingURL=base-injectable.js.map