define(["require", "exports", "./ctrl"], function (require, exports, ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.name = "nullableField";
    function directive() {
        return {
            controller: ctrl_1.Ctrl,
            controllerAs: "Ctrl",
            restrict: "E",
            //language=html
            template: "<formly-form model=\"Ctrl.formModel\" fields=\"Ctrl.fields\"></formly-form>",
            scope: {
                model: "=",
                type: "@",
                label: "@"
            }
        };
    }
    exports.directive = directive;
});
//# sourceMappingURL=directive.js.map