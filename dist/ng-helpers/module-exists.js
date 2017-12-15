define(["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function moduleExists(m, names) {
        var cnt = 0;
        try {
            if (!!angular.module(name) && m.requires.some(function (x) { return x == name; })) {
                cnt++;
            }
        }
        catch (e) {
            return false;
        }
        return cnt == names.length;
    }
    exports.moduleExists = moduleExists;
    function configureModuleIfExists(m, moduleNames, fn) {
        if (moduleExists(m, moduleNames)) {
            try {
                fn();
            }
            catch (e) {
                console.error("NgUtils: error configuring module " + JSON.stringify(moduleNames));
                console.error(e);
            }
        }
        else {
            console.info("NgUtils: module configuration " + JSON.stringify(moduleNames) + " skipped");
        }
    }
    exports.configureModuleIfExists = configureModuleIfExists;
});
//# sourceMappingURL=module-exists.js.map