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
            template: `
            <span ng-if="Ctrl.IsLoading" ng-transclude="loading"></span>
            <span ng-if="!Ctrl.IsLoading" ng-transclude="content"></span>
            `,
            scope: {
                isLoading: "="
            }
        };
    }
    exports.directive = directive;
});
//# sourceMappingURL=directive.js.map