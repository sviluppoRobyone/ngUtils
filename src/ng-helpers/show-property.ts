import BaseCtrlForDirective from "./utils/base-ctrl-for-directive";
import * as angular from "angular";
import { GetDirectiveName } from "./utils/name-generator";
import { registerDirective } from "./core";

export var directiveName=GetDirectiveName("showProperty");
export default function register(m: ng.IModule) {
    registerDirective(m,directiveName,directive); 
}
export function directive() {
    return {
        scope: {
            object: "="
        },
        controllerAs: "Ctrl",
        controller: ShowPropertyCtrl,
        //language=html
        template:

        `
<!--
       <debug-modal object="Ctrl.Object"></debug-modal>
<debug-modal object="Ctrl.PropertyName"></debug-modal>
<pre>{{Ctrl.Ready}}</pre>
<pre>{{Ctrl.IsDefined}}</pre>
-->
         <span ng-if="!Ctrl.Ready">
            <i class="fa fa-spin fa-circle-o-notch"></i>
         </span>
        <span ng-if="Ctrl.Ready">
        <span ng-if="Ctrl.IsDefined" ng-switch="Ctrl.Type">
     
            <span ng-switch-when="null" >ND</span>

            <span ng-switch-when="string" >{{Ctrl.PropertyValue}}</span>

            <span ng-switch-when="number" >{{Ctrl.PropertyValue}}</span>

            <span ng-switch-when="date" >{{Ctrl.PropertyValue|date}}</span>

            <span ng-switch-when="boolean" >
                {{Ctrl.PropertyValue?"SI":"NO"}}
            </span>
            <span ng-switch-when="object" >
                <code>[object]</code>
               <debug-modal object="Ctrl.PropertyValue"></debug-modal>
            </span>
                      <span ng-switch-default>It's something else</span>
        </span>
        <span ng-if="!Ctrl.IsDefined" >
        [{{Ctrl.PropertyName}}] is not defined
        </span>

        </span>
         
`
    } as ng.IDirective;
}

class ShowPropertyCtrl extends BaseCtrlForDirective {
    
    private get Object() {
        return this.$scope["object"];
    }
    private get PropertyName() {
        return this.$attrs["propertyName"];
    }

    private get PropertyValue() {
        return this.Object[this.PropertyName];
    }


    private get Ready() {
        return [this.Object, this.PropertyName].every(x => typeof x != "undefined" && x != null);
    }

    private get IsDefined() {
        return this.Ready && !!this.Object[this.PropertyName];
    }
    private get Type() {
        if (!this.IsDefined) return "null";
        if (this.PropertyValue instanceof Array) return "array";
        if (this.PropertyValue instanceof Date) return "date";
        return typeof (this.PropertyValue);
    }
}