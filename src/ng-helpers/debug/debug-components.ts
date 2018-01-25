import BaseInjectable from "../utils/base-injectable";
import * as angular from "angular";
import { registerDirective } from "../core";
import { GetDirectiveName } from "../utils/name-generator";
import { directive } from "../formly/nullable-field-directive/directive";
import { DebugDetectors } from "./debug-service";

export default function register(m:ng.IModule){
    
    ifDebug.register(m);
}
export module ifDebug{

    export var directiveName=GetDirectiveName("ifDebug");
    export function register(m:ng.IModule){
        registerDirective(m,directiveName,directive);
    }

    function Directive(){
        return {
            restrict:"E",
            controller:IfDebugCtrl,
            controllerAs:"Ctrl",
            transclude:true,
            scope:{},
            template:`<ng-transclude ng-if="Ctrl.Debug"></ng-transclude>`

        }   as ng.IDirective;
    }

    class IfDebugCtrl extends BaseInjectable{
        
        private get Debug(){
            return DebugDetectors.IsDebugEnabled();
        }      
    }
}