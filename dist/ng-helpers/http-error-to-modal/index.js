define(["require", "exports", "./interceptor"], function (require, exports, interceptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        var factoryName = "HttpErrorToModalFactory";
        m.config([
            "$httpProvider",
            ($httpProvider) => {
                $httpProvider.interceptors.push(factoryName);
            }
        ]);
        const arr = [].concat(interceptor_1.Interceptor.$inject);
        arr.push((...args) => {
            return new interceptor_1.Interceptor(...args);
        });
        m.factory(factoryName, arr);
    }
    exports.register = register;
});
//# sourceMappingURL=index.js.map