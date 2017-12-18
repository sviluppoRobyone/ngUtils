define(["require", "exports", "./modal-ctrl"], function (require, exports, modal_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Interceptor = /** @class */ (function () {
        function Interceptor() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = this;
            this.args = [];
            this.errorList = [];
            this.$modal = null;
            this.responseError = function (rejection) {
                try {
                    rejection["json"] = JSON.parse(rejection.data);
                    if (rejection["json"]["Response"]) {
                        rejection["json"] = JSON.parse(rejection["json"]["Response"]);
                    }
                }
                catch (e) {
                    rejection["json"] = null;
                }
                _this.errorList.push(rejection);
                if (!_this.$modal) {
                    _this.$modal = _this.$uibModal.open({
                        controllerAs: "Ctrl",
                        resolve: {
                            errors: function () {
                                return _this.errorList;
                            }
                        },
                        controller: modal_ctrl_1.ModalController,
                        //language=html
                        template: "\n                        <div class=\"modal-header\">\n                            <h4 class=\"modal-title\" >\n                                Si \u00E8 verificato un errore\n                            </h3>\n                        </div>\n                        <div class=\"modal-body\">\n                            \n                            <div ng-repeat=\"e in Ctrl.Errors\" class=\"well well-sm\" >\n                            \n                                <p>\n                                    <small ng-if=\"e.status\">{{e.status}}</small>\n                                    <small ng-if=\"e.statusText\">{{e.statusText}}</small>\n                                    <code  ng-if=\"e.config.url\">{{e.config.url}}</code>\n                              \n                                </p>\n                                <div ng-if=\"e.json\">\n                                    <p class=\"lead\" ng-if=\"e.json.Message\">Messaggio: <em>{{e.json.Message}}</em></p>\n                                    <div ng-if=\"e.json.ModelState\">\n                                        <dl ng-repeat=\"(key,errs) in e.json.ModelState\">\n                                            <dt>{{key}}</dt>\n                                            <dd>\n                                                    <ul class=\"list-unstyled\" style=\"margin:0\">\n                                                    <li ng-repeat=\"s in errs\">{{s}}</li>            \n                                        </ul>\n                                            </dd>\n                                        </dl> \n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n    "
                    });
                }
                return _this.$q.reject(rejection);
            };
            this.args = args;
        }
        Object.defineProperty(Interceptor.prototype, "$injector", {
            get: function () {
                return this.args[Interceptor.$inject.indexOf("$injector")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interceptor.prototype, "$q", {
            get: function () {
                return this.args[Interceptor.$inject.indexOf("$q")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interceptor.prototype, "$uibModal", {
            get: function () {
                return this.$injector.get("$uibModal");
            },
            enumerable: true,
            configurable: true
        });
        Interceptor.$inject = ["$q", "$injector"];
        return Interceptor;
    }());
    exports.Interceptor = Interceptor;
});
//# sourceMappingURL=interceptor.js.map