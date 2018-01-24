
export function html(m: ng.IModule) {
    m.filter("html", [
        "$sce", ($sce:ng.ISCEService) => {
            return (htmlCode:string) => {                        
                return $sce.trustAsHtml(htmlCode);
            }
        }
    ]);
}

export function url(m: ng.IModule) {
    m.filter("url", [
        "$sce", ($sce:ng.ISCEService) => {
            return (url:string) => {
                return $sce.trustAsResourceUrl(url);
            }
        }
    ]);
}

export function bytes(m: ng.IModule) {
    m.filter("bytes", () => {
        return (bytes:any, precision:number) => {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return "-";
            if (typeof precision === "undefined") precision = 1;
            var units = ["bytes", "kB", "MB", "GB", "TB", "PB"],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + " " + units[number];
        };
    });
}
export default function RegisterAllFilters(m: ng.IModule) {
    [html, url, bytes].map(x => x(m));
}