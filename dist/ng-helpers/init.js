define(["require", "exports", "./service", "./filters/index", "./utils/module-exists", "./fa-loading/index", "./promise-buttons/index", "./http-error-to-modal/index", "./debug/debug-service", "./debug/debug-modal", "./file-viewer", "./formly/index", "../prototype/all"], function (require, exports, ngUtils, filters, moduleExists, faLoading, promiseButton, HttpErrorToModal, debugService, debugModal, fileViewer, formly) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function init(m) {
        debugService.register(m);
        ngUtils.register(m);
        filters.RegisterAllFilters(m);
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
            fileViewer.register(m);
        });
    }
    exports.init = init;
});
//# sourceMappingURL=init.js.map