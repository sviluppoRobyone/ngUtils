define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function moduleExists(m, names) {
        return names.every(x => m.requires.some(y => y == x));
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
            console.info("NgUtils: module configuration " +
                JSON.stringify(moduleNames) +
                " skipped");
        }
    }
    exports.configureModuleIfExists = configureModuleIfExists;
});
//# sourceMappingURL=module-exists.js.map