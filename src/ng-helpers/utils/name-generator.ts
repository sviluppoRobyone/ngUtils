
const  prefix="$ngu";

import poly from "../../polyfill/index";
import { GetLogger } from "../log";
import { capitalize } from "../../js-helpers/string-helpers";

var $log= GetLogger();
export function GetServiceName(name:string){
  var n=prefix+(capitalize(name))+"Service";
    $log.debug("Generating service name from",name,"to",n);
  return n;
}

export function GetDirectiveName(name:string){
    return name;
}