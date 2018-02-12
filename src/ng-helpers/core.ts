import * as angular from "angular";
import  BaseInjectable  from "./utils/base-injectable";
import { GetLogger } from "./log";
import BaseObj from "../js-helpers/obj-helpers";



export interface IDirectiveFn{
    ():ng.IDirective
}
function CheckInject(obj:BaseObj){
    $log.debug(obj);
    if (obj["$inject"] )
    {
 
    var getInject=()=>{
        return (obj["$inject"]||[]) as string[];
    };
 

    if (getInject().some(x=>(typeof x != typeof ""))){
        $log.warn(obj,"Injecting some wrong value",getInject());
    }
    else{
        $log.debug(obj,"Check inject passed");
    }
}
}
var $log=GetLogger();
export function registerDirective(m:ng.IModule,directiveName:string,directive:IDirectiveFn){
    
    $log.debug("Registering directive",directiveName,"inside module",m.name,directive);
    m.directive(directiveName,directive);
}

export function registerService<T extends BaseInjectable|BaseObj|any>(m:ng.IModule,serviceName:string,service:T){
   
  var s=(service as any) as BaseObj;
   CheckInject(s);
   
    $log.debug("Registering service",s,"inside module",m.name,s,service["$inject"]||"No $inject found",s._objInfo.ClassName);
    m.service(serviceName,service as any);
}

export function ConcatenaInject(...arrays){
     var MyNewArray=[].concat(...arrays);

   $log.debug("Concatenating",arrays,"in",MyNewArray);
   return MyNewArray;
}