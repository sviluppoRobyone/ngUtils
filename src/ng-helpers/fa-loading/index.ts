import * as directive from "./directive";
import * as $ from "jquery";
import {baseTheme} from "./themes";
import { registerDirective } from "../core";
export default function register(m: ng.IModule) {
    registerDirective(m,directive.directiveName,directive.directive);
 

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
            
          
            registerDirective(m,dirName,baseTheme.DirectiveBuilder(html));
        });

    });

}