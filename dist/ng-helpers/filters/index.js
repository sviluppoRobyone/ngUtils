define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function html(m) {
        m.filter("html", [
            "$sce", ($sce) => {
                return (htmlCode) => {
                    return $sce.trustAsHtml(htmlCode);
                };
            }
        ]);
    }
    exports.html = html;
    function url(m) {
        m.filter("url", [
            "$sce", ($sce) => {
                return (url) => {
                    return $sce.trustAsResourceUrl(url);
                };
            }
        ]);
    }
    exports.url = url;
    function bytes(m) {
        m.filter("bytes", () => {
            return (bytes, precision) => {
                if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
                    return "-";
                if (typeof precision === "undefined")
                    precision = 1;
                var units = ["bytes", "kB", "MB", "GB", "TB", "PB"], number = Math.floor(Math.log(bytes) / Math.log(1024));
                return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + " " + units[number];
            };
        });
    }
    exports.bytes = bytes;
    function AllFilters(m) {
        [html, url, bytes].map(x => x(m));
    }
    exports.AllFilters = AllFilters;
});
//# sourceMappingURL=index.js.map