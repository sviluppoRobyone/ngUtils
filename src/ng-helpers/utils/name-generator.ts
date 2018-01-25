
import * as stringHelpers from "../../js-helpers/string-helpers";
const  prefix="$ngu";
export function GetServiceName(name){
    return prefix+stringHelpers.capitalizeFirstLetter(name)+"Service";
}
export function GetFactoryName(name){
    return prefix+stringHelpers.capitalizeFirstLetter(name)+"Factory";
}
export function GetDirectiveName(name){
    return name;
}