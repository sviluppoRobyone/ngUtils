import { BaseCtrl } from "../utils/base-ctrl";
import * as nameGenerator from "../utils/name-generator";

const directiveName = nameGenerator.GetDirectiveName("debugModal");
const dataKey = directiveName+"debugData";
export function register(m: ng.IModule) {

    m.directive(directiveName, directive);

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

        `
    <button class="btn btn-xs" ng-click="Ctrl.open()" ng-if="Ctrl.showDebugButton" type="button">
<i class="fa fa-code"></i>
</button>
`
    } as ng.IDirective;
}

class debugModalCtrl extends BaseCtrl {

    private get data() {
        return this.$scope["object"];
    }

    private get showDebugButton() {
        
        return this.$ngUtils.$debugService.DebugStatus;
    }

    open() {
      
        this.$uibModal.open({
            controllerAs: "Ctrl",
            controller: ModalCtrl,
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

class ModalCtrl extends BaseCtrl {

    static $inject = BaseCtrl.$inject.concat([dataKey]);

    private get data() {
        return this.$injectedArgs[ModalCtrl.$inject.indexOf(dataKey)];
    }

}
