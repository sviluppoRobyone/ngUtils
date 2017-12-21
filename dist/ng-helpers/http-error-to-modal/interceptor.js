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
define(["require", "exports", "./modal-ctrl", "../base-injectable"], function (require, exports, modal_ctrl_1, base_injectable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Interceptor = /** @class */ (function (_super) {
        __extends(Interceptor, _super);
        function Interceptor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.errorList = [];
            _this.$modal = null;
            _this.responseError = function (rejection) {
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
                        template: "\n                        <div class=\"modal-header\">\n                            <h4 class=\"modal-title\" >\n                                Si \u00E8 verificato un errore\n                            </h3>\n                        </div>\n                        <div class=\"modal-body\">\n                            \n                            <div ng-repeat=\"e in Ctrl.Errors\" class=\"well well-sm\" >\n                            \n                                <p>\n                                    <small ng-if=\"e.status\">{{e.status}}</small>\n                                    <small ng-if=\"e.statusText\">{{e.statusText}}</small>\n                                    <code  ng-if=\"e.config.url\">{{e.config.url}}</code>\n                              \n                                </p>\n                                <div ng-if=\"e.json\">\n                                    <p class=\"lead\" ng-if=\"e.json.Message\">Messaggio: <em>{{e.json.Message}}</em></p>\n                                    <span ng-if=\"e.json.Source=='EntityFramework' && e.json.InnerException\"> \n                                        <ul ng-repeat=\"e in e.json.InnerException.Errors\">\n                                            <li>{{e.message}}</li>\n                                        </ul>\n                                    </span>\n                                    <div ng-if=\"e.json.ModelState\">\n                                        <dl ng-repeat=\"(key,errs) in e.json.ModelState\">\n                                            <dt>{{key}}</dt>\n                                            <dd>\n                                                    <ul class=\"list-unstyled\" style=\"margin:0\">\n                                                    <li ng-repeat=\"s in errs\">{{s}}</li>            \n                                        </ul>\n                                            </dd>\n                                        </dl> \n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n    "
                    });
                }
                return _this.$q.reject(rejection);
            };
            return _this;
        }
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
        Interceptor.$inject = base_injectable_1.BaseInjectable.$inject.concat(["$q", "$injector"]);
        return Interceptor;
    }(base_injectable_1.BaseInjectable));
    exports.Interceptor = Interceptor;
});
//# sourceMappingURL=interceptor.js.map