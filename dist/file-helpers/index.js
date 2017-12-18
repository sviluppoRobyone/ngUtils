define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fileUtils;
    (function (fileUtils) {
        //http://wiki.lenux.org/base64-string-to-blob-object/
        function base64StringToBlob(base64encodedString) {
            // decode base64 string, remove space for IE compatibility
            var binary = atob(base64encodedString.replace(/\s/g, ''));
            // get binary length
            var len = binary.length;
            // create ArrayBuffer with binary length
            var buffer = new ArrayBuffer(len);
            // create 8-bit Array
            var view = new Uint8Array(buffer);
            // save unicode of binary data into 8-bit Array
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            // create the blob object with content-type "application/pdf"               
            return new Blob([view]);
        }
        fileUtils.base64StringToBlob = base64StringToBlob;
    })(fileUtils = exports.fileUtils || (exports.fileUtils = {}));
});
//# sourceMappingURL=index.js.map