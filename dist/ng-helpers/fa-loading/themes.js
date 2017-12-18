define(["require", "exports", "./directive"], function (require, exports, d) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseTheme;
    (function (baseTheme) {
        function DirectiveBuilder(loadingTemplate) {
            return function () {
                console.log(loadingTemplate);
                var originalDirective = d.directive();
                originalDirective.transclude = true;
                //language=html
                originalDirective.template = "\n                    <fa-loading is-loading=\"Ctrl.IsLoading\">\n                        <loading>" + loadingTemplate + "</loading>\n                        <content ng-transclude>\n                         \n                        </content>\n                    </fa-loading>\n    ";
                return originalDirective;
            };
        }
        baseTheme.DirectiveBuilder = DirectiveBuilder;
    })(baseTheme = exports.baseTheme || (exports.baseTheme = {}));
});
//# sourceMappingURL=themes.js.map