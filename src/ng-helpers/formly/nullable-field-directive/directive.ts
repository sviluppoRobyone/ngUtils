import * as angular from "angular";
import {Ctrl} from "./ctrl";
export var name="nullableField";
export function directive() {
    return {
        controller: Ctrl,
        controllerAs: "Ctrl",
        restrict: "E",
        //language=html
        template: `<formly-form model="Ctrl.formModel" fields="Ctrl.fields"></formly-form>`,
        scope: {
            model: "=",
            type: "@",
            label: "@"
        }
    } as ng.IDirective;
}