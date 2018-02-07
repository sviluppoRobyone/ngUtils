import * as angular from "angular";
import  BaseInjectable  from "./utils/base-injectable";
import { GetLogger } from "./log";


    

export interface IDirectiveFn{
    ():ng.IDirective
}

export function registerDirective(m:ng.IModule,directiveName:string,directive:IDirectiveFn){
    var $log=GetLogger();
    $log.debug("Registering directive",directiveName,"inside module",m.name,directive);
    m.directive(directiveName,directive);
}

export function registerService(m:ng.IModule,serviceName:string,service:ng.Injectable<Function>){
    var $log=GetLogger();
    $log.debug("Registering service",serviceName,"inside module",m.name,service);
    m.service(serviceName,service);
}
export function registerFactory(m:ng.IModule,factoryName:string,factory:ng.Injectable<Function>){
    var $log=GetLogger();
    $log.debug("Registering factory",factoryName,"inside module",m.name,factory);
    m.factory(factoryName,factory);
}