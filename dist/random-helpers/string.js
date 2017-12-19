define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function randomStringV1(length) {
        return randomSeedOfLength(length);
    }
    exports.randomStringV1 = randomStringV1;
    function randomSeed() {
        return Math.random().toString(36).substring(2, 15);
    }
    function randomSeedOfLength(length) {
        var s = randomSeed();
        while (s.length < length)
            s += randomSeed();
        return s.length > length ? s.substring(0, length) : s;
    }
});
//# sourceMappingURL=string.js.map