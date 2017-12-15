define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.directive(base.directiveName, base.Directive);
        var spinners = ["circle-o-notch", "cog", "gear", "refresh", "spinner"];
        var sizes = [null, "lg", "2x", "3x", "4x", "5x"];
        var baseTmpl = $("<div/>");
        baseTmpl.addClass("text-center");
        $("<i/>")
            .addClass("fa fa-spin")
            .appendTo(baseTmpl);
        spinners.forEach(function (spinner, spinnerIndex) {
            sizes.forEach(function (size) {
                var div = baseTmpl.clone();
                var i = $(".fa", div);
                i.addClass("fa-" + spinner);
                if (size)
                    i.addClass("fa-" + size);
                var html = $("<div/>").append(div).html();
                var dirName = base.directiveName + (size || "") + "T" + (spinnerIndex + 1);
                m.directive(dirName, base.baseTheme.DirectiveBuilder(html));
            });
        });
    }
    exports.register = register;
});
//# sourceMappingURL=index.js.map