define(["require", "exports", "./directive"], function (require, exports, d) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseTheme;
    (function (baseTheme) {
        function DirectiveBuilder(loadingTemplate) {
            return () => {
                console.log(loadingTemplate);
                var originalDirective = d.directive();
                originalDirective.transclude = true;
                //language=html
                originalDirective.template = `
                    <fa-loading is-loading="Ctrl.IsLoading">
                        <loading>${loadingTemplate}</loading>
                        <content ng-transclude>
                         
                        </content>
                    </fa-loading>
    `;
                return originalDirective;
            };
        }
        baseTheme.DirectiveBuilder = DirectiveBuilder;
    })(baseTheme = exports.baseTheme || (exports.baseTheme = {}));
});
//# sourceMappingURL=themes.js.map