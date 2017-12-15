import {baseTheme} from "./themes";
import * as angular from "angular";
import {Ctrl } from "./ctrl";
export var directiveName = "faLoading";

export function directive() {
    return {
        transclude: {
            'content': "content",
            'loading': "loading"
        },
        controller:Ctrl,
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

    } as ng.IDirective;
}