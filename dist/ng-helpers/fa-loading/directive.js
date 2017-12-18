define(["require", "exports", "./ctrl"], function (require, exports, ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.directiveName = "faLoading";
    function directive() {
        return {
            transclude: {
                'content': "content",
                'loading': "loading"
            },
            controller: ctrl_1.Ctrl,
            restrict: "E",
            controllerAs: "Ctrl",
            //language=html
            template: "\n            <span ng-if=\"Ctrl.IsLoading\" ng-transclude=\"loading\"></span>\n            <span ng-if=\"!Ctrl.IsLoading\" ng-transclude=\"content\"></span>\n            ",
            scope: {
                isLoading: "="
            }
        };
    }
    exports.directive = directive;
});
//# sourceMappingURL=directive.js.map