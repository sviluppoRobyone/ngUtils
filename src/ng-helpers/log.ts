
import * as angular from "angular";
import { IsDebugEnabled } from "../js-helpers/debug-detectors";

export default function configure(m:ng.IModule){
    m.config(["$logProvider",($logProvider:ng.ILogProvider)=>{
        
        $logProvider.debugEnabled(IsDebugEnabled());
    }]);
}

export function GetLogger(){
    var $log =  angular.injector(['ng']).get('$log');

    return $log;
}