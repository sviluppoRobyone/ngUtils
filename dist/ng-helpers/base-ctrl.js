define(["require", "exports", "./service", "./base-injectable"], function (require, exports, service_1, base_injectable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseCtrl extends base_injectable_1.BaseInjectable {
        get $scope() {
            return this.args[BaseCtrl.$inject.indexOf("$scope")];
        }
        get $ngUtils() {
            return this.args[BaseCtrl.$inject.indexOf(service_1.ngUtilsService.serviceName)];
        }
        get $q() {
            return this.$ngUtils.$q;
        }
        get $state() {
            return this.$ngUtils.$state;
        }
        get $stateParams() {
            return this.$ngUtils.$stateParams;
        }
        get $upload() {
            return this.$ngUtils.$Upload;
        }
        get $uibModal() {
            return this.$ngUtils.$uibModal;
        }
    }
    BaseCtrl.$inject = [].concat(["$scope", service_1.ngUtilsService.serviceName]);
    exports.BaseCtrl = BaseCtrl;
});
//# sourceMappingURL=base-ctrl.js.map