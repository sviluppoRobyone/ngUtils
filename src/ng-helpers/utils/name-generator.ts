
const  prefix="$ngu";

import poly from "../../polyfill/index";
poly();
export function GetServiceName(name){
    return prefix+(name.capitalize())+"Service";
}
export function GetFactoryName(name){
    return prefix+(name.capitalize())+"Factory";
}
export function GetDirectiveName(name){
    return name;
}