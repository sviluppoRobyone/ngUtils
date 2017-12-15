define(["require", "exports", "./interceptor"], function (require, exports, interceptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        var factoryName = "HttpErrorToModalFactory";
        m.config(["$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push(factoryName);
            }
        ]);
        var arr = [].concat(interceptor_1.Interceptor.$inject);
        arr.push(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (interceptor_1.Interceptor.bind.apply(interceptor_1.Interceptor, [void 0].concat(args)))();
        });
        m.factory(factoryName, arr);
    }
    exports.register = register;
});
//# sourceMappingURL=register.js.map