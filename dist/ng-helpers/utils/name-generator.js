define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var prefix = "$ngu";
    function GetServiceName(name) {
        return prefix + name + "Service";
    }
    exports.GetServiceName = GetServiceName;
    function GetDirectiveName(name) {
        return name;
    }
    exports.GetDirectiveName = GetDirectiveName;
});
//# sourceMappingURL=name-generator.js.map