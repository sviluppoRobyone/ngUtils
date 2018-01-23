import * as angular from "angular";
import * as ngUtils from "./service";
import * as filters from "./filters/index";
import * as moduleExists from "./utils/module-exists";
import * as faLoading from "./fa-loading/index";
import * as promiseButton from "./promise-buttons/index";
import * as HttpErrorToModal from "./http-error-to-modal/index";
import * as debugService from "./debug/debug-service";
import * as debugModal from "./debug/debug-modal";
import * as fileViewer from "./file-viewer";
import * as formly from "./formly/index";
import * as asyncLoader from "./async-loader";
import * as  polyfill from  "../polyfill/all";

export function init(m: ng.IModule) {

    m.config(["$logProvider",($logProvider:ng.ILogProvider)=>{
        $logProvider.debugEnabled(debugService.Detectors.IsDebugEnabled())
    }]);
    
    polyfill.run();
    debugService.register(m);
    asyncLoader.register(m);

    
    ngUtils.register(m);
    
    
    filters.RegisterAllFilters(m);
    faLoading.register(m);

    moduleExists.configureModuleIfExists(m, ["formly"], () => {
      formly.Configure(m);
    });

    moduleExists.configureModuleIfExists(m, ["angularPromiseButtons"], () => {
  
      promiseButton.Configure(m);
      
    });


    moduleExists.configureModuleIfExists(m, ["ui.bootstrap"], () => {
        HttpErrorToModal.register(m);
        debugModal.register(m);
        fileViewer.register(m);
    });
}
