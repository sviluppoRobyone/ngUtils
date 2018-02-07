import BaseInjectable from "../utils/base-injectable";
import * as angular from "angular";
import { registerDirective } from "../core";
import { GetDirectiveName } from "../utils/name-generator";
import { DebugDetectors } from "./debug-service";

export default function register(m:ng.IModule){
    
    ifDebug.register(m);
}
export module ifDebug{

    export var directiveName=GetDirectiveName("ifDebug");
    export function register(m:ng.IModule){
        registerDirective(m,directiveName,Directive);
    }

    function Directive(){
        return {
            restrict:"E",
            replace:true,
            controller:IfDebugCtrl,
            controllerAs:"Ctrl",
            transclude:true,
            scope:{},
            template:`<ng-transclude ng-if="Ctrl.Debug" class="if-debug"></ng-transclude>`

        }   as ng.IDirective;
    }

    class IfDebugCtrl extends BaseInjectable{
        
        private get Debug(){
            return DebugDetectors.IsDebugEnabled();
        }      
    }
}