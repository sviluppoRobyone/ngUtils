import * as angular from "angular";
import {ngUtilsService} from "./service";
import * as filters from "./filters/index";
import * as moduleExists from "./module-exists";

export function Init(m: ng.IModule) {
    m.service(ngUtilsService.serviceName, ngUtilsService);
    filters.AllFilters(m);
  //  ngUtils.faLoading.register(m);

    moduleExists.configureModuleIfExists(m, "formly", () => {
/*
        ngUtils.formly.Configure(m);
        ngUtils.formly.directives.NullableFieldDirective.register(m);
        ngUtils.formly.directives.formBuilder.register(m);
        */

    });

    moduleExists.configureModuleIfExists(m, "angularPromiseButtons", () => {
       // ngUtils.promiseButton.Configure(m);
    });


    moduleExists.configureModuleIfExists(m, "ui.bootstrap", () => {
      //  ngUtils.HttpErrorToModal.register(m);
    });
}