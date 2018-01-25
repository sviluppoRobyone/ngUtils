import {Detectors} from "./debug/debug-service";
import * as angular from "angular";
import  BaseInjectable  from "./utils/base-injectable";


    

export interface IDirectiveFn{
    ():ng.IDirective
}

export function registerDirective(m:ng.IModule,directiveName:string,directive:IDirectiveFn){
    var $log=ConsoleUtils.GetLogger();
    $log.debug("Registering directive",directiveName,"inside module",m.name);
    m.directive(directiveName,directive);
}

export function registerService(m:ng.IModule,serviceName:string,service:ng.Injectable<Function>){
    var $log=ConsoleUtils.GetLogger();
    $log.debug("Registering service",serviceName,"inside module",m.name);
    m.service(serviceName,service);
}
export function registerFactory(m:ng.IModule,factoryName:string,factory:ng.Injectable<Function>){
    var $log=ConsoleUtils.GetLogger();
    $log.debug("Registering factory",factoryName,"inside module",m.name);
    m.factory(factoryName,factory);
}
export module ConsoleUtils{
    export function GetLogger(){
        var $log =  angular.injector(['ng']).get('$log');
    
        return $log;
    }
}