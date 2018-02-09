import * as angular from "angular";
import  BaseInjectable  from "./utils/base-injectable";
import { GetLogger } from "./log";



export interface IDirectiveFn{
    ():ng.IDirective
}
function CheckInject(obj:any){
    if (obj["$inject"])
    {
 
    var getInject=()=>{
        return (obj["$inject"]||[]) as string[];
    };
 

    if (getInject().some(x=>(typeof x != typeof ""))){
        $log.warn(obj._objInfo.ClassName,"Injecting some wrong value",getInject());
    }
    else{
        $log.debug(obj._objInfo.ClassName,"Check inject passed");
    }
}
}
var $log=GetLogger();
export function registerDirective(m:ng.IModule,directiveName:string,directive:IDirectiveFn){
    
    $log.debug("Registering directive",directiveName,"inside module",m.name,directive);
    m.directive(directiveName,directive);
}

export function registerService(m:ng.IModule,serviceName:string,service:ng.Injectable<Function>){
   
  
   CheckInject(service);
   
    $log.debug("Registering service",serviceName,"inside module",m.name,service,service["$inject"]||"No $inject found");
    m.service(serviceName,service);
}

export function ConcatenaInject(...arrays){
     var MyNewArray=[].concat(...arrays);

   $log.debug("Concatenating",arrays,"in",MyNewArray);
   return MyNewArray;
}