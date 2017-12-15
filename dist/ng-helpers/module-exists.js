define(["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function moduleExists(m, name) {
        try {
            return !!angular.module(name) && m.requires.some(function (x) { return x == name; });
        }
        catch (e) {
            return false;
        }
    }
    exports.moduleExists = moduleExists;
    function configureModuleIfExists(m, moduleName, fn) {
        if (moduleExists(m, moduleName)) {
            try {
                fn();
            }
            catch (e) {
                console.error("NgUtils: error configuring module " + moduleName);
                console.error(e);
            }
        }
        else {
            console.info("NgUtils: module configuration " + moduleName + " skipped");
        }
    }
    exports.configureModuleIfExists = configureModuleIfExists;
});
//# sourceMappingURL=module-exists.js.map