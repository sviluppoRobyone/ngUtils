define(["require", "exports", "./base-ctrl"], function (require, exports, base_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dataKey = "debugData";
    const directiveName = "debugModal";
    function register(m) {
        m.directive(directiveName, directive);
    }
    exports.register = register;
    function directive() {
        return {
            scope: {
                object: "="
            },
            controller: debugModalCtrl,
            controllerAs: "Ctrl",
            restrict: "E",
            template: `
    <button class="btn btn-xs" ng-click="Ctrl.open()" ng-if="Ctrl.showDebugButton">
<i class="fa fa-code"></i>
</button>
`
        };
    }
    class debugModalCtrl extends base_ctrl_1.BaseCtrl {
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
                template: `
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
    class ModalCtrl extends base_ctrl_1.BaseCtrl {
        get data() {
            return this.args[ModalCtrl.$inject.indexOf(dataKey)];
        }
    }
    ModalCtrl.$inject = [].concat(base_ctrl_1.BaseCtrl.$inject, [dataKey]);
});
//# sourceMappingURL=debug-modal.js.map