import * as nameGenerator from "../utils/name-generator";
import { registerDirective } from "../core";
import {  configureModuleIfExists } from "../utils/module-exists";
import BaseCtrlForDirective from "../utils/base-ctrl-for-directive";
import BaseCtrl from "../utils/base-ctrl";

const directiveName = nameGenerator.GetDirectiveName("debugModal");
const dataKey = directiveName+"debugData";
export default function register(m: ng.IModule) {

    configureModuleIfExists(m, ["ui.bootstrap"], () => {
        registerDirective(m,directiveName,directive);
    });
  
}

function directive() {
    return {
        scope: {
            object: "="
        },
        controller: debugModalCtrl,
        controllerAs: "Ctrl",
        restrict: "E",
     
        template:

        `<if-debug>
            <button class="btn btn-xs" ng-click="Ctrl.open()"type="button">
                <i class="fa fa-code"></i>
            </button>
        </if-debug>
        `
    } as ng.IDirective;
}

class debugModalCtrl extends BaseCtrlForDirective {

    private get data() {
        return this.$scope["object"];
    }
    private get DebuggedVariable():string{
        return this.$element.attr("object");
    }
    open() {
      
        this.$uibModal.open({
            controllerAs: "Ctrl",
            controller: DebugModalContentCtrl,
            size: "lg",
            resolve: {
                [dataKey]: () => this.data
            },
            template:
                `
            <div class="modal-header">
                <h3>Debug Modal</h3>
            </div>
            <div class="modal-body">
               <pre>{{Ctrl.data|json}}</pre>
            </div>
            `
        });
    }
}

class DebugModalContentCtrl extends BaseCtrl {

    public static $inject = BaseCtrl.$inject.concat([dataKey]);

    private get data() {
        return this.$injectedArgs[DebugModalContentCtrl.$inject.indexOf(dataKey)];
    }

}
