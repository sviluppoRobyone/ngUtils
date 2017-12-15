define(["require", "exports", "./service", "./filters/index", "./module-exists"], function (require, exports, service_1, filters, moduleExists) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Init(m) {
        m.service(service_1.ngUtilsService.serviceName, service_1.ngUtilsService);
        filters.AllFilters(m);
        //  ngUtils.faLoading.register(m);
        moduleExists.configureModuleIfExists(m, "formly", function () {
            /*
                    ngUtils.formly.Configure(m);
                    ngUtils.formly.directives.NullableFieldDirective.register(m);
                    ngUtils.formly.directives.formBuilder.register(m);
                    */
        });
        moduleExists.configureModuleIfExists(m, "angularPromiseButtons", function () {
            // ngUtils.promiseButton.Configure(m);
        });
        moduleExists.configureModuleIfExists(m, "ui.bootstrap", function () {
            //  ngUtils.HttpErrorToModal.register(m);
        });
    }
    exports.Init = Init;
});
//# sourceMappingURL=init.js.map