define(["require", "exports", "./directive"], function (require, exports, d) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.directive(d.name, d.directive);
    }
    exports.register = register;
});
//# sourceMappingURL=index.js.map