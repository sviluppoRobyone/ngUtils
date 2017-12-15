import * as angular from "angular";

export function moduleExists(m: ng.IModule, name: string) {
    try {
        return !!angular.module(name) && m.requires.some(x => x == name);
    } catch (e) {
        return false;
    }
}
export function configureModuleIfExists(m: ng.IModule, moduleName: string, fn: Function) {
    
            if (moduleExists(m, moduleName)) {
                try {
                    fn();
    
                } catch (e) {
                    console.error("NgUtils: error configuring module " + moduleName);
                    console.error(e);
                }
            } else {
                console.info("NgUtils: module configuration " + moduleName + " skipped");
            }
        }