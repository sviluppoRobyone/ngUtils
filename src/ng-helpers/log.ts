
import * as angular from "angular";
import { IsDebugEnabled,status } from "../js-helpers/debug-detectors";

export default function configure(m:ng.IModule){
    m.config(["$logProvider",($logProvider:ng.ILogProvider)=>{
        var ide=IsDebugEnabled();
        var $log=GetLogger();
        $log.debug("Enviroment debug",JSON.stringify(status));
        GetLogger().info("Set debug",ide?"enabled":"disabled");
        $logProvider.debugEnabled(ide);
    }]);
}

export function GetLogger(){
    var $log =  angular.injector(["ng"]).get("$log");
    return $log;
}