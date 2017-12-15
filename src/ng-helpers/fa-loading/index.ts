import * as directive from "./directive";
import {baseTheme} from "./themes";
export function register(m: ng.IModule) {
    m.directive(directive.directiveName, directive.directive);

    var spinners = ["circle-o-notch", "cog", "gear", "refresh", "spinner"];

    var sizes = [null, "lg", "2x", "3x", "4x", "5x"];

    var baseTmpl = $("<div/>");
    baseTmpl.addClass("text-center");

    $("<i/>")
        .addClass("fa fa-spin")
        .appendTo(baseTmpl);


    spinners.forEach((spinner, spinnerIndex) => {
        sizes.forEach(size => {

            var div = baseTmpl.clone();
            var i = $(".fa", div);
            i.addClass(`fa-${spinner}`);

            if (size)
                i.addClass(`fa-${size}`);

            var html = $("<div/>").append(div).html();
            var dirName = directive.directiveName + (size || "") + "T" + (spinnerIndex + 1);
            m.directive(dirName, baseTheme.DirectiveBuilder(html));
        });

    });

}