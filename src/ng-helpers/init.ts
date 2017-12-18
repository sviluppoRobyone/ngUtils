import * as angular from "angular";
import {ngUtilsService} from "./service";
import * as filters from "./filters/index";
import * as moduleExists from "./module-exists";
import * as faLoading from "./fa-loading/index";
import * as promiseButton from "./promise-buttons/index";
import * as HttpErrorToModal from "./http-error-to-modal/index";
import * as formly from "./formly/index";

export function init(m: ng.IModule) {
    m.service(ngUtilsService.serviceName, ngUtilsService);
    filters.AllFilters(m);
    faLoading.register(m);

    moduleExists.configureModuleIfExists(m, ["formly"], () => {
      formly.Configure(m);
    });

    moduleExists.configureModuleIfExists(m, ["angularPromiseButtons"], () => {
      promiseButton.Configure(m);
      
    });


    moduleExists.configureModuleIfExists(m, ["ui.bootstrap"], () => {
        HttpErrorToModal.register(m);
    });
}
