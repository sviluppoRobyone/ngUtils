define(["require", "exports", "./service", "./filters/index", "./module-exists", "./fa-loading/index", "./promise-buttons/index", "./http-error-to-modal/index", "./debug-modal", "./formly/index"], function (require, exports, service_1, filters, moduleExists, faLoading, promiseButton, HttpErrorToModal, debugModal, formly) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function init(m) {
        m.service(service_1.ngUtilsService.serviceName, service_1.ngUtilsService);
        filters.AllFilters(m);
        faLoading.register(m);
        moduleExists.configureModuleIfExists(m, ["formly"], function () {
            formly.Configure(m);
        });
        moduleExists.configureModuleIfExists(m, ["angularPromiseButtons"], function () {
            promiseButton.Configure(m);
        });
        moduleExists.configureModuleIfExists(m, ["ui.bootstrap"], function () {
            HttpErrorToModal.register(m);
            debugModal.register(m);
        });
    }
    exports.init = init;
});
//# sourceMappingURL=init.js.map