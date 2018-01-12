import {baseTheme} from "./themes";
import * as angular from "angular";
import {Ctrl } from "./ctrl";
import * as nameGenerator from "../utils/name-generator";
export var directiveName = nameGenerator.GetDirectiveName("faLoading");

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