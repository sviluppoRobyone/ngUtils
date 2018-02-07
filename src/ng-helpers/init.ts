import * as angular from "angular";
import ngUtils from "./service";
import filters from "./filters/index";
import * as moduleExists from "./utils/module-exists";
import faLoading from "./fa-loading/index";
import promiseButton from "./promise-buttons/index";
import HttpErrorToModal from "./http-error-to-modal/index";
import debugReg from "./debug/debug";
import fileViewer from "./file-viewer";
import formly from "./formly/index";
import asyncLoader from "./async-loader";
import polyfill from  "../polyfill/index";
import * as events from "./events";
import showPropertyDirective from "./show-property";
import configureLog from "./log";

export default function init(m: ng.IModule) {


    
    polyfill();
    configureLog(m);
    debugReg(m);
    asyncLoader(m);
    events.register(m);
    
    ngUtils(m);
    
    showPropertyDirective(m);
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
        
        fileViewer(m);
    });
}
