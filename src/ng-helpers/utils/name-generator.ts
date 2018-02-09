
const  prefix="$ngu";

import poly from "../../polyfill/index";
import { GetLogger } from "../log";
poly();
var $log= GetLogger();
export function GetServiceName(name){
  var n=prefix+(name.capitalize())+"Service";
    $log.debug("Generating service name from",name,"to",n);
  return n;
}

export function GetDirectiveName(name){
    return name;
}