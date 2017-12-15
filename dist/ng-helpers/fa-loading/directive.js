define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function directive() {
        return {
            transclude: {
                'content': "content",
                'loading': "loading"
            },
            controller: ,
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