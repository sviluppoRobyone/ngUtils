define(["require", "exports", "./modal-ctrl"], function (require, exports, modal_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Interceptor {
        constructor(...args) {
            this.args = [];
            this.errorList = [];
            this.$modal = null;
            this.responseError = (rejection) => {
                try {
                    rejection["json"] = JSON.parse(rejection.data);
                    if (rejection["json"]["Response"]) {
                        rejection["json"] = JSON.parse(rejection["json"]["Response"]);
                    }
                }
                catch (e) {
                    rejection["json"] = null;
                }
                this.errorList.push(rejection);
                if (!this.$modal) {
                    this.$modal = this.$uibModal.open({
                        controllerAs: "Ctrl",
                        resolve: {
                            errors: () => {
                                return this.errorList;
                            }
                        },
                        controller: modal_ctrl_1.ModalController,
                        //language=html
                        template: `
                        <div class="modal-header">
                            <h4 class="modal-title" >
                                Si è verificato un errore
                            </h3>
                        </div>
                        <div class="modal-body">
                            
                            <div ng-repeat="e in Ctrl.Errors" class="well well-sm" >
                            
                                <p>
                                    <small ng-if="e.status">{{e.status}}</small>
                                    <small ng-if="e.statusText">{{e.statusText}}</small>
                                    <code  ng-if="e.config.url">{{e.config.url}}</code>
                              
                                </p>
                                <div ng-if="e.json">
                                    <p class="lead" ng-if="e.json.Message">Messaggio: <em>{{e.json.Message}}</em></p>
                                    <div ng-if="e.json.ModelState">
                                        <dl ng-repeat="(key,errs) in e.json.ModelState">
                                            <dt>{{key}}</dt>
                                            <dd>
                                                    <ul class="list-unstyled" style="margin:0">
                                                    <li ng-repeat="s in errs">{{s}}</li>            
                                        </ul>
                                            </dd>
                                        </dl> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
    `
                    });
                }
                return this.$q.reject(rejection);
            };
            this.args = args;
        }
        get $injector() {
            return this.args[Interceptor.$inject.indexOf("$injector")];
        }
        get $q() {
            return this.args[Interceptor.$inject.indexOf("$q")];
        }
        get $uibModal() {
            return this.$injector.get("$uibModal");
        }
    }
    Interceptor.$inject = ["$q", "$injector"];
    exports.Interceptor = Interceptor;
});
//# sourceMappingURL=interceptor.js.map