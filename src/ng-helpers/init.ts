import * as angular from "angular";
import {ngUtilsService} from "./service";
import * as filters from "./filters/index";

export function Init(m: ng.IModule) {
    m.service(ngUtilsService.serviceName, ngUtilsService);
    filters.AllFilters(m);
    ngUtils.faLoading.register(m);

    configureModule(m, "formly", () => {

        ngUtils.formly.Configure(m);
        ngUtils.formly.directives.NullableFieldDirective.register(m);
        ngUtils.formly.directives.formBuilder.register(m);

    });

    configureModule(m, "angularPromiseButtons", () => {
        ngUtils.promiseButton.Configure(m);
    });


    configureModule(m, "ui.bootstrap", () => {
        ngUtils.HttpErrorToModal.register(m);
    });
}