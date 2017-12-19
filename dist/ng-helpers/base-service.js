define(["require", "exports", "./base-injectable", "./service"], function (require, exports, base_injectable_1, service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseService extends base_injectable_1.BaseInjectable {
        get $ngUtils() {
            return this.getFromInject(service_1.ngUtilsService.serviceName);
        }
        get $uibModal() {
            return this.$ngUtils.$uibModal;
        }
        get $q() {
            return this.$ngUtils.$q;
        }
    }
    BaseService.$inject = [].concat([service_1.ngUtilsService.serviceName]);
    exports.BaseService = BaseService;
});
//# sourceMappingURL=base-service.js.map