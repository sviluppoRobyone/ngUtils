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
define(["require", "exports", "../utils/base-ctrl", "../utils/name-generator"], function (require, exports, base_ctrl_1, nameGenerator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var directiveName = nameGenerator.GetServiceName("debugModal");
    var dataKey = directiveName + "debugData";
    function register(m) {
        m.directive(directiveName, directive);
    }
    exports.register = register;
    function directive() {
        return {
            scope: {
                object: "="
            },
            controller: debugModalCtrl,
            controllerAs: "Ctrl",
            restrict: "E",
            template: "\n    <button class=\"btn btn-xs\" ng-click=\"Ctrl.open()\" ng-if=\"Ctrl.showDebugButton\">\n<i class=\"fa fa-code\"></i>\n</button>\n"
        };
    }
    var debugModalCtrl = /** @class */ (function (_super) {
        __extends(debugModalCtrl, _super);
        function debugModalCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(debugModalCtrl.prototype, "data", {
            get: function () {
                return this.$scope["object"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(debugModalCtrl.prototype, "showDebugButton", {
            get: function () {
                return this.$ngUtils.$debugService.DebugStatus;
            },
            enumerable: true,
            configurable: true
        });
        debugModalCtrl.prototype.open = function () {
            var _this = this;
            this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: ModalCtrl,
                size: "lg",
                resolve: (_a = {},
                    _a[dataKey] = function () { return _this.data; },
                    _a),
                template: "\n            <div class=\"modal-header\">\n                <h3>Debug Modal</h3>\n            </div>\n            <div class=\"modal-body\">\n               <pre>{{Ctrl.data|json}}</pre>\n            </div>\n            "
            });
            var _a;
        };
        return debugModalCtrl;
    }(base_ctrl_1.BaseCtrl));
    var ModalCtrl = /** @class */ (function (_super) {
        __extends(ModalCtrl, _super);
        function ModalCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ModalCtrl.prototype, "data", {
            get: function () {
                return this.$injectedArgs[ModalCtrl.$inject.indexOf(dataKey)];
            },
            enumerable: true,
            configurable: true
        });
        ModalCtrl.$inject = [].concat(base_ctrl_1.BaseCtrl.$inject, [dataKey]);
        return ModalCtrl;
    }(base_ctrl_1.BaseCtrl));
});
//# sourceMappingURL=debug-modal.js.map