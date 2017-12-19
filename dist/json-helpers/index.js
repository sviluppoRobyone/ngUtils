define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonUtils;
    (function (JsonUtils) {
        function DateReviver(key, value) {
            var regexs = [
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\Z$/
            ];
            if (typeof value === "string" && regexs.some(x => x.test(value))) {
                return new Date(value);
            }
            return value;
        }
        JsonUtils.DateReviver = DateReviver;
    })(JsonUtils = exports.JsonUtils || (exports.JsonUtils = {}));
});
//# sourceMappingURL=index.js.map