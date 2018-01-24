import * as angular from "angular";
import ngUtils from "./service";
import filters from "./filters/index";
import * as moduleExists from "./utils/module-exists";
import faLoading from "./fa-loading/index";
import promiseButton from "./promise-buttons/index";
import HttpErrorToModal from "./http-error-to-modal/index";
import debugService from "./debug/debug-service";
import debugModal from "./debug/debug-modal";
import fileViewer from "./file-viewer";
import formly from "./formly/index";
import asyncLoader from "./async-loader";
import polyfill from  "../polyfill/index";
import {Detectors as DebugDetectors} from "./debug/debug-service";

export function init(m: ng.IModule) {

    m.config(["$logProvider",($logProvider:ng.ILogProvider)=>{
        $logProvider.debugEnabled(DebugDetectors.IsDebugEnabled())
    }]);
    
    polyfill();
    debugService(m);
    asyncLoader(m);

    
    ngUtils(m);
    
    
    filters(m);
    faLoading(m);

    moduleExists.configureModuleIfExists(m, ["formly"], () => {
      formly(m);
    });

    moduleExists.configureModuleIfExists(m, ["angularPromiseButtons"], () => {
  
      promiseButton(m);
      
    });


    moduleExists.configureModuleIfExists(m, ["ui.bootstrap"], () => {
        HttpErrorToModal(m);
        debugModal(m);
        fileViewer(m);
    });
}
