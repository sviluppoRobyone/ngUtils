import BaseInjectable from "../utils/base-injectable";
import * as angular from "angular";
import { registerDirective } from "../core";
import { GetDirectiveName } from "../utils/name-generator";
import { IsDebugEnabled } from "../../js-helpers/debug-detectors";


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
            controller:IfDebugCtrl,
            controllerAs:"Ctrl",
            transclude:true,
            scope:{},
            template:`<ng-transclude ng-if="Ctrl.Debug" class="if-debug"></ng-transclude>`

        }   as ng.IDirective;
    }

    class IfDebugCtrl extends BaseInjectable{
        
        private get Debug(){
            return IsDebugEnabled();
        }      
    }
}
export module ifNotDebug{

    export var directiveName=GetDirectiveName("ifNotDebug");
    export function register(m:ng.IModule){
        registerDirective(m,directiveName,Directive);
    }

    function Directive(){
        return {
            restrict:"E",
            controller:IfDebugCtrl,
            controllerAs:"Ctrl",
            transclude:true,
            scope:{},
            template:`<ng-transclude ng-if="!Ctrl.Debug" class="if-debug"></ng-transclude>`

        }   as ng.IDirective;
    }

    class IfDebugCtrl extends BaseInjectable{
        
        private get Debug(){
            return IsDebugEnabled();
        }      
    }
}