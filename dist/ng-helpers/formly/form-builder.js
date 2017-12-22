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
define(["require", "exports", "../base-ctrl-for-directive"], function (require, exports, base_ctrl_for_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.directive("formBuilder", directive);
    }
    exports.register = register;
    function directive() {
        return {
            //language=
            template: "\n<div class=\"form-builder\">\n<form name=\"f\" ng-submit=\"Ctrl.onSave()\" promise-btn>\n<fieldset>\n<legend>{{Ctrl.title}}</legend>\n<formly-form fields=\"Ctrl.fields\" model=\"Ctrl.model\"></formly-form>\n<ng-transclude></ng-transclude>\n<hr/>\n<button class=\"btn btn-primary\" ng-disabled=\"!f.$valid\">SALVA</button>\n</fieldset>\n</form>\n</div>\n",
            controller: Ctrl,
            controllerAs: "Ctrl",
            transclude: true,
            replace: true,
            scope: {
                model: "=",
                fields: "=",
                onSave: "&"
            }
        };
    }
    var Ctrl = /** @class */ (function (_super) {
        __extends(Ctrl, _super);
        function Ctrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Ctrl.prototype, "model", {
            get: function () {
                return this.$scope["model"];
            },
            set: function (v) {
                this.$scope["model"] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "fields", {
            get: function () {
                return this.$scope["fields"];
            },
            set: function (v) {
                this.$scope["fields"] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "title", {
            get: function () {
                return this.$attrs["title"] || null;
            },
            enumerable: true,
            configurable: true
        });
        Ctrl.prototype.onSave = function () {
            return this.$scope["onSave"]();
        };
        return Ctrl;
    }(base_ctrl_for_directive_1.BaseCtrlForDirective));
});
//# sourceMappingURL=form-builder.js.map