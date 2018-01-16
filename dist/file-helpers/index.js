define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //http://wiki.lenux.org/base64-string-to-blob-object/
    function base64ToBlob(base64encodedString, myme) {
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
        return new Blob([view], { type: myme });
    }
    exports.base64ToBlob = base64ToBlob;
    function blobToBase64(blob, cb) {
        var reader = new FileReader();
        reader.onloadend = function () {
            cb(reader.result.plit(',')[1]);
        };
        reader.readAsDataURL(blob);
    }
    exports.blobToBase64 = blobToBase64;
    function download(fileName, blob) {
        blobToBase64(blob, function (base64String) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:' + blob.type + ';charset=utf-8,' + encodeURIComponent(base64String));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }
    exports.download = download;
});
//# sourceMappingURL=index.js.map