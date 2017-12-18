import { BaseCtrl } from "./base-ctrl";

const dataKey = "debugData";
const directiveName = "debugModal";

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
    <button class="btn btn-xs" ng-click="Ctrl.open()" ng-if="Ctrl.showDebugButton">
<i class="fa fa-code"></i>
</button>
`
    } as ng.IDirective;
}

class debugModalCtrl extends BaseCtrl {

    get data() {
        return this.$scope["object"];
    }
    get showDebugButton() {
        
        return !!window["DEBUG"];
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

    static $inject = ([] as string[]).concat(BaseCtrl.$inject, [dataKey]);

    get data() {
        return this.args[ModalCtrl.$inject.indexOf(dataKey)];
    }

}
