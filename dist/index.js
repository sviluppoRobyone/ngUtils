"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (typeof predicate !== "function") {
            throw new TypeError("predicate must be a function");
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
define("file-helpers/index", ["require", "exports"], function (require, exports) {
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
            cb(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
    }
    exports.blobToBase64 = blobToBase64;
    function download(fileName, blob) {
        blobToBase64(blob, function (base64String) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:' + blob.type + ';base64,' + encodeURIComponent(base64String));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }
    exports.download = download;
});
define("json-helpers/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonUtils;
    (function (JsonUtils) {
        function DateReviver(key, value) {
            var regexs = [
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\Z$/
            ];
            if (typeof value === "string" && regexs.some(function (x) { return x.test(value); })) {
                return new Date(value);
            }
            return value;
        }
        JsonUtils.DateReviver = DateReviver;
    })(JsonUtils = exports.JsonUtils || (exports.JsonUtils = {}));
});
define("ng-helpers/utils/base-injectable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseInjectable = /** @class */ (function () {
        function BaseInjectable() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = this;
            this._store = {};
            this._args = [];
            this._args = args;
            ["_store", "_args"].forEach(function (x) {
                Object.defineProperty(_this, x, { enumerable: false });
            });
        }
        BaseInjectable.prototype.getFromInject = function (key) {
            if (!this._store[key])
                this._store[key] = this.$injector.get(key);
            return this._store[key];
        };
        Object.defineProperty(BaseInjectable.prototype, "$injector", {
            get: function () {
                return this.$injectedArgs[BaseInjectable.$inject.indexOf("$injector")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$injectedArgs", {
            get: function () {
                return this._args;
            },
            enumerable: true,
            configurable: true
        });
        BaseInjectable.$inject = ["$injector"];
        return BaseInjectable;
    }());
    exports.BaseInjectable = BaseInjectable;
});
define("ng-helpers/file-viewer", ["require", "exports", "ng-helpers/utils/base-injectable"], function (require, exports, base_injectable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fileKey = "fileToView";
    exports.serviceName = "fileViewer";
    function register(m) {
        m.service(exports.serviceName, fileViewerService);
    }
    exports.register = register;
    var fileViewerService = /** @class */ (function (_super) {
        __extends(fileViewerService, _super);
        function fileViewerService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(fileViewerService.prototype, "$uibModal", {
            get: function () {
                return this.getFromInject("$uibModal");
            },
            enumerable: true,
            configurable: true
        });
        fileViewerService.prototype.viewFile = function (file) {
            return this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: ModalCtrl,
                size: "lg",
                resolve: (_a = {},
                    _a[fileKey] = function () { return file; },
                    _a),
                template: "\n                        <div class=\"modal-header\">\n                            <h3>Titolo</h3>\n                        </div>\n                        <div class=\"modal-body\">\n                            <div class=\"embed-responsive embed-responsive-4by3\">\n                              <iframe class=\"embed-responsive-item\" ng-src=\"{{Ctrl.dataUri|url}}\"></iframe>\n                            </div>\n                            \n                        </div>\n                        "
            });
            var _a;
        };
        return fileViewerService;
    }(base_injectable_1.BaseInjectable));
    exports.fileViewerService = fileViewerService;
    var ModalCtrl = /** @class */ (function (_super) {
        __extends(ModalCtrl, _super);
        function ModalCtrl() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.dataUri = null;
            _this.buildDataUri();
            return _this;
        }
        Object.defineProperty(ModalCtrl.prototype, "file", {
            get: function () {
                return this.$injectedArgs[ModalCtrl.$inject.indexOf(fileKey)];
            },
            enumerable: true,
            configurable: true
        });
        ModalCtrl.prototype.buildDataUri = function () {
            var _this = this;
            var reader = new FileReader();
            reader.onload = function () {
                _this.dataUri = reader.result;
            };
            reader.readAsDataURL(this.file);
        };
        ModalCtrl.$inject = base_injectable_1.BaseInjectable.$inject.concat([fileKey]);
        return ModalCtrl;
    }(base_injectable_1.BaseInjectable));
});
define("ng-helpers/utils/name-generator", ["require", "exports"], function (require, exports) {
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
define("ng-helpers/debug/debug-service", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/utils/name-generator"], function (require, exports, bi, nameGenerator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.service(exports.serviceName, Service);
    }
    exports.register = register;
    exports.serviceName = nameGenerator.GetServiceName("debug");
    var Detectors;
    (function (Detectors) {
        Detectors.DebugName = "DEBUG";
        function IsLocalhost() {
            return window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1";
        }
        Detectors.IsLocalhost = IsLocalhost;
        function IsLocalDomain() {
            return window.location.hostname.endsWith(".local");
        }
        Detectors.IsLocalDomain = IsLocalDomain;
        function IsWindowDebugDefined() {
            return Detectors.DebugName in window;
        }
        Detectors.IsWindowDebugDefined = IsWindowDebugDefined;
        function GetWindowDebugValue() {
            if (!IsWindowDebugDefined())
                throw "[" + Detectors.DebugName + "] must be defined in window: window." + Detectors.DebugName + "=true/false;";
            return window[Detectors.DebugName];
        }
        Detectors.GetWindowDebugValue = GetWindowDebugValue;
        function IsDev() {
            return IsWindowDebugDefined() ? GetWindowDebugValue() : (IsLocalhost() || IsLocalDomain());
        }
        Detectors.IsDev = IsDev;
    })(Detectors = exports.Detectors || (exports.Detectors = {}));
    var Service = /** @class */ (function (_super) {
        __extends(Service, _super);
        function Service() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.DebugStatus = false;
            _this.Updater = null;
            _this.init();
            return _this;
        }
        Object.defineProperty(Service.prototype, "$timeout", {
            get: function () {
                return this.getFromInject("$timeout");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$rootScope", {
            get: function () {
                return this.getFromInject("$rootScope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
            },
            enumerable: true,
            configurable: true
        });
        Service.prototype.UpdateStatus = function () {
            var _this = this;
            return this.$q(function (ok) {
                _this.Updater().then(function (x) {
                    _this.$timeout(function () {
                        _this.DebugStatus = x;
                    }).then(function () { return ok(); });
                }).catch(function () {
                    ok();
                });
            });
        };
        Service.prototype.init = function () {
            var _this = this;
            var fn = function () {
                return _this.$q.resolve(_this.updateDebugV1);
            };
            this.SetDebugUpdater(fn);
            this.UpdateStatus();
        };
        Service.prototype.SetDebugUpdater = function (f) {
            this.Updater = f;
        };
        Object.defineProperty(Service.prototype, "updateDebugV1", {
            get: function () {
                return Detectors.IsDev();
            },
            enumerable: true,
            configurable: true
        });
        return Service;
    }(bi.BaseInjectable));
    exports.Service = Service;
});
define("ng-helpers/service", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/file-viewer", "ng-helpers/utils/name-generator", "ng-helpers/debug/debug-service", "ng-helpers/async-loader"], function (require, exports, bi, fv, nameGenerator, debugService, AsyncLoader) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = nameGenerator.GetServiceName("$ngUtils");
    function register(m) {
        m.service(exports.serviceName, Service);
    }
    exports.register = register;
    var Service = /** @class */ (function (_super) {
        __extends(Service, _super);
        function Service() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Service.prototype, "$rootScope", {
            get: function () {
                return this.getFromInject("$rootScope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$http", {
            get: function () {
                return this.getFromInject("$http");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$location", {
            get: function () {
                return this.getFromInject("$location");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$filter", {
            get: function () {
                return this.getFromInject("$filter");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$timeout", {
            get: function () {
                return this.getFromInject("$timeout");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$cacheFactory", {
            get: function () {
                return this.getFromInject("$cacheFactory");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$locale", {
            get: function () {
                return this.getFromInject("$locale");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$interval", {
            get: function () {
                return this.getFromInject("$interval");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$log", {
            get: function () {
                return this.getFromInject("$log");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$sce", {
            get: function () {
                return this.getFromInject("$sce");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$Upload", {
            get: function () {
                return this.getFromInject("Upload");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$stateParams", {
            get: function () {
                return this.getFromInject("$stateParams");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$state", {
            get: function () {
                return this.getFromInject("$state");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$uibModal", {
            get: function () {
                return this.getFromInject("$uibModal");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$debugService", {
            get: function () {
                return this.$injectedArgs[Service.$inject.indexOf(debugService.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$fileViewer", {
            get: function () {
                return this.$injectedArgs[Service.$inject.indexOf(fv.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$asyncLoader", {
            get: function () {
                return this.$injectedArgs[Service.$inject.indexOf(AsyncLoader.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        ///@deprecated
        Service.prototype.manageAjaxLoading = function (before, ajax, after) {
            var _this = this;
            var qBefore = this.$q.defer();
            var qAjax = this.$q.defer();
            var qAfter = this.$q.defer();
            var doBefore = function () {
                _this.$timeout(function () {
                    before && before();
                }).then(function () {
                    qBefore.resolve();
                });
            };
            var doAfter = function () {
                _this.$timeout(function () {
                    after && after();
                }).then(function () {
                    qAfter.resolve();
                });
            };
            qBefore.promise.then(function () {
                ajax(qAjax.resolve, qAjax.reject);
            });
            qAjax.promise.then(function () {
                doAfter();
            });
            return this.$q(function (ok, ko) {
                qAfter.promise.then(function () {
                    ok();
                });
                doBefore();
            });
        };
        Service.prototype.onScopeDispose = function ($scope) {
            var q = this.$q.defer();
            $scope.$on("$destroy", function () {
                q.resolve();
            });
            return q.promise;
        };
        Service.$inject = bi.BaseInjectable.$inject.concat([debugService.serviceName, AsyncLoader.serviceName, fv.serviceName]);
        return Service;
    }(bi.BaseInjectable));
    exports.Service = Service;
});
define("ng-helpers/utils/base-ctrl", ["require", "exports", "ng-helpers/service", "ng-helpers/utils/base-injectable"], function (require, exports, ngUtils, base_injectable_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseCtrl = /** @class */ (function (_super) {
        __extends(BaseCtrl, _super);
        function BaseCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseCtrl.prototype, "$scope", {
            get: function () {
                return this.$injectedArgs[BaseCtrl.$inject.indexOf("$scope")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$ngUtils", {
            get: function () {
                return this.$injectedArgs[BaseCtrl.$inject.indexOf(ngUtils.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$q", {
            get: function () {
                return this.$ngUtils.$q;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$state", {
            get: function () {
                return this.$ngUtils.$state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$stateParams", {
            get: function () {
                return this.$ngUtils.$stateParams;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$upload", {
            get: function () {
                return this.$ngUtils.$Upload;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$uibModal", {
            get: function () {
                return this.$ngUtils.$uibModal;
            },
            enumerable: true,
            configurable: true
        });
        BaseCtrl.$inject = base_injectable_2.BaseInjectable.$inject.concat(["$scope", ngUtils.serviceName]);
        return BaseCtrl;
    }(base_injectable_2.BaseInjectable));
    exports.BaseCtrl = BaseCtrl;
});
define("ng-helpers/utils/base-ctrl-for-directive", ["require", "exports", "ng-helpers/utils/base-ctrl"], function (require, exports, base_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseCtrlForDirective = /** @class */ (function (_super) {
        __extends(BaseCtrlForDirective, _super);
        function BaseCtrlForDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseCtrlForDirective.prototype, "$attrs", {
            get: function () {
                return this.$injectedArgs[BaseCtrlForDirective.$inject.indexOf("$attrs")];
            },
            enumerable: true,
            configurable: true
        });
        BaseCtrlForDirective.$inject = base_ctrl_1.BaseCtrl.$inject.concat(["$attrs"]);
        return BaseCtrlForDirective;
    }(base_ctrl_1.BaseCtrl));
    exports.BaseCtrlForDirective = BaseCtrlForDirective;
});
define("ng-helpers/async-loader", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/utils/name-generator", "ng-helpers/utils/base-ctrl-for-directive"], function (require, exports, bj, nameGenerator, base_ctrl_for_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = nameGenerator.GetServiceName("AsyncLoader");
    function register(m) {
        m.service(exports.serviceName, Service);
        directive.register(m);
    }
    exports.register = register;
    var Config = /** @class */ (function () {
        function Config() {
            this.args = null;
            this.isLoading = false;
            this.isSuccess = false;
            this.isFailed = false;
            this.successCount = 0;
            this.GetDataFn = null;
        }
        return Config;
    }());
    exports.Config = Config;
    var AsyncLoader = /** @class */ (function () {
        function AsyncLoader(c) {
            var _this = this;
            this._config = new Config();
            this._Data = null;
            this._config.args = c;
            ["_Data", "_config"].forEach(function (x) {
                Object.defineProperty(_this, x, { enumerable: false });
            });
        }
        Object.defineProperty(AsyncLoader.prototype, "$q", {
            get: function () {
                return this._config.args.$q;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "$timeout", {
            get: function () {
                return this._config.args.$timeout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsLoading", {
            get: function () {
                return this._config.isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsSuccess", {
            get: function () {
                return this._config.isSuccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsFailed", {
            get: function () {
                return this._config.isFailed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "Data", {
            get: function () {
                return this._Data;
            },
            enumerable: true,
            configurable: true
        });
        AsyncLoader.prototype.Update = function () {
            var _this = this;
            return this.$q(function (ok) {
                _this.$timeout(function () {
                    _this._config.isLoading = true;
                }).then(function () {
                    _this.$q(_this._config.args.Fn).then(function (data) {
                        _this._Data = data;
                        _this.$timeout(function () {
                            _this._config.successCount++;
                            _this._config.isLoading = false;
                            _this._config.isSuccess = true;
                            _this._config.isFailed = false;
                        }).then(function () {
                            ok();
                        });
                    }).catch(function () {
                        _this.$timeout(function () {
                            _this._config.isLoading = false;
                            _this._config.isSuccess = true;
                            _this._config.isFailed = false;
                        }).then(function () {
                            ok();
                        });
                    });
                });
            });
        };
        return AsyncLoader;
    }());
    exports.AsyncLoader = AsyncLoader;
    var Service = /** @class */ (function (_super) {
        __extends(Service, _super);
        function Service() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Service.prototype, "$q", {
            get: function () {
                return this.getFromInject("$q");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Service.prototype, "$timeout", {
            get: function () {
                return this.getFromInject("$timeout");
            },
            enumerable: true,
            configurable: true
        });
        Service.prototype.Create = function (f) {
            return new AsyncLoader({
                $q: this.$q,
                $timeout: this.$timeout,
                Fn: f
            });
        };
        return Service;
    }(bj.BaseInjectable));
    exports.Service = Service;
    var directive;
    (function (directive_1) {
        function register(m) {
            m.directive("asyncLoader", directive);
        }
        directive_1.register = register;
        function directive() {
            return {
                template: "\n            <fa-loading is-loading=\"Ctrl.IsLoading\"></fa-loading>\n            <ng-transclude></ng-transclude>\n            <span ng-if=\"Ctrl.IsFailed\">\n                Errore\n            </span>\n            ",
                scope: {
                    loaders: "="
                },
                controller: Ctrl,
                controllerAs: "Ctrl",
                transclude: true
            };
        }
        var Ctrl = /** @class */ (function (_super) {
            __extends(Ctrl, _super);
            function Ctrl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(Ctrl.prototype, "loaders", {
                get: function () {
                    return this.$scope["loaders"];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Ctrl.prototype, "AsyncLoaders", {
                get: function () {
                    return this.loaders.filter(function (x) { return x instanceof AsyncLoader; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Ctrl.prototype, "IsLoading", {
                get: function () {
                    return this.AsyncLoaders.some(function (x) { return x.IsLoading; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Ctrl.prototype, "IsSuccess", {
                get: function () {
                    return this.AsyncLoaders.every(function (x) { return x.IsSuccess; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Ctrl.prototype, "IsFailed", {
                get: function () {
                    return this.AsyncLoaders.some(function (x) { return x.IsFailed; });
                },
                enumerable: true,
                configurable: true
            });
            return Ctrl;
        }(base_ctrl_for_directive_1.BaseCtrlForDirective));
    })(directive || (directive = {}));
});
define("ng-helpers/filters/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function html(m) {
        m.filter("html", [
            "$sce", function ($sce) {
                return function (htmlCode) {
                    return $sce.trustAsHtml(htmlCode);
                };
            }
        ]);
    }
    exports.html = html;
    function url(m) {
        m.filter("url", [
            "$sce", function ($sce) {
                return function (url) {
                    return $sce.trustAsResourceUrl(url);
                };
            }
        ]);
    }
    exports.url = url;
    function bytes(m) {
        m.filter("bytes", function () {
            return function (bytes, precision) {
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
    function RegisterAllFilters(m) {
        [html, url, bytes].map(function (x) { return x(m); });
    }
    exports.RegisterAllFilters = RegisterAllFilters;
});
define("ng-helpers/utils/module-exists", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function moduleExists(m, names) {
        return names.every(function (x) { return m.requires.some(function (y) { return y == x; }); });
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
define("ng-helpers/fa-loading/themes", ["require", "exports", "ng-helpers/fa-loading/directive"], function (require, exports, d) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseTheme;
    (function (baseTheme) {
        function DirectiveBuilder(loadingTemplate) {
            return function () {
                var originalDirective = d.directive();
                originalDirective.transclude = true;
                //language=html
                originalDirective.template = "\n                    <fa-loading is-loading=\"Ctrl.IsLoading\">\n                        <loading>" + loadingTemplate + "</loading>\n                        <content ng-transclude>\n                         \n                        </content>\n                    </fa-loading>\n    ";
                return originalDirective;
            };
        }
        baseTheme.DirectiveBuilder = DirectiveBuilder;
    })(baseTheme = exports.baseTheme || (exports.baseTheme = {}));
});
define("ng-helpers/fa-loading/ctrl", ["require", "exports", "ng-helpers/utils/base-ctrl"], function (require, exports, base_ctrl_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ctrl = /** @class */ (function (_super) {
        __extends(Ctrl, _super);
        function Ctrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Ctrl.prototype, "IsLoading", {
            get: function () {
                return !!this.$scope["isLoading"];
            },
            enumerable: true,
            configurable: true
        });
        return Ctrl;
    }(base_ctrl_2.BaseCtrl));
    exports.Ctrl = Ctrl;
});
define("ng-helpers/fa-loading/directive", ["require", "exports", "ng-helpers/fa-loading/ctrl", "ng-helpers/utils/name-generator"], function (require, exports, ctrl_1, nameGenerator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.directiveName = nameGenerator.GetDirectiveName("faLoading");
    function directive() {
        return {
            transclude: {
                'content': "content",
                'loading': "loading"
            },
            controller: ctrl_1.Ctrl,
            restrict: "E",
            controllerAs: "Ctrl",
            //language=html
            template: "\n            <span ng-if=\"Ctrl.IsLoading\" ng-transclude=\"loading\"></span>\n            <span ng-if=\"!Ctrl.IsLoading\" ng-transclude=\"content\"></span>\n            ",
            scope: {
                isLoading: "="
            }
        };
    }
    exports.directive = directive;
});
define("ng-helpers/fa-loading/index", ["require", "exports", "ng-helpers/fa-loading/directive", "jquery", "ng-helpers/fa-loading/themes"], function (require, exports, directive, $, themes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.directive(directive.directiveName, directive.directive);
        var spinners = ["circle-o-notch", "cog", "gear", "refresh", "spinner"];
        var sizes = [null, "lg", "2x", "3x", "4x", "5x"];
        var baseTmpl = $("<div/>");
        baseTmpl.addClass("text-center");
        $("<i/>")
            .addClass("fa fa-spin")
            .appendTo(baseTmpl);
        spinners.forEach(function (spinner, spinnerIndex) {
            sizes.forEach(function (size) {
                var div = baseTmpl.clone();
                var i = $(".fa", div);
                i.addClass("fa-" + spinner);
                if (size)
                    i.addClass("fa-" + size);
                var html = $("<div/>").append(div).html();
                var dirName = directive.directiveName + (size || "") + "T" + (spinnerIndex + 1);
                console.log("register", dirName);
                m.directive(dirName, themes_1.baseTheme.DirectiveBuilder(html));
            });
        });
    }
    exports.register = register;
});
define("ng-helpers/promise-buttons/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Configure(module) {
        module.config(["angularPromiseButtonsProvider", function (angularPromiseButtonsProvider) {
                angularPromiseButtonsProvider.extendConfig({
                    spinnerTpl: ' <span class="fa fa-spin fa-circle-o-notch fa-loading"></span> ',
                    disableBtn: true,
                    btnLoadingClass: "is-loading",
                    addClassToCurrentBtnOnly: false,
                    disableCurrentBtnOnly: false,
                    minDuration: false
                });
            }
        ]);
    }
    exports.Configure = Configure;
});
define("ng-helpers/http-error-to-modal/modal-ctrl", ["require", "exports", "ng-helpers/utils/base-ctrl"], function (require, exports, base_ctrl_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorKey = "ModalErrorData";
    var Ctrl = /** @class */ (function (_super) {
        __extends(Ctrl, _super);
        function Ctrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Ctrl.prototype, "Errors", {
            get: function () {
                return this.$injectedArgs[Ctrl.$inject.indexOf(exports.ErrorKey)];
            },
            enumerable: true,
            configurable: true
        });
        Ctrl.$inject = base_ctrl_3.BaseCtrl.$inject.concat([exports.ErrorKey]);
        return Ctrl;
    }(base_ctrl_3.BaseCtrl));
    exports.Ctrl = Ctrl;
});
define("ng-helpers/http-error-to-modal/interceptor", ["require", "exports", "ng-helpers/http-error-to-modal/modal-ctrl", "ng-helpers/utils/base-injectable"], function (require, exports, ModalController, base_injectable_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Interceptor = /** @class */ (function (_super) {
        __extends(Interceptor, _super);
        function Interceptor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.errorList = [];
            _this.$modal = null;
            _this.responseError = function (rejection) {
                try {
                    rejection["json"] = JSON.parse(rejection.data);
                    if (rejection["json"]["Response"]) {
                        rejection["json"] = JSON.parse(rejection["json"]["Response"]);
                    }
                }
                catch (e) {
                    rejection["json"] = null;
                }
                _this.errorList.push(rejection);
                if (!_this.$modal) {
                    _this.$modal = _this.$uibModal.open({
                        controllerAs: "Ctrl",
                        resolve: (_a = {},
                            _a[ModalController.ErrorKey] = function () {
                                return _this.errorList;
                            },
                            _a),
                        controller: ModalController.Ctrl,
                        template: "\n                        <div class=\"modal-header\">\n                            <h4 class=\"modal-title\" >\n                                Si \u00E8 verificato un errore\n                            </h3>\n                        </div>\n                        <div class=\"modal-body\">\n                            \n                            <div ng-repeat=\"e in Ctrl.Errors\" class=\"well well-sm\" >\n                            \n                                <p>\n                                    <small ng-if=\"e.status\">{{e.status}}</small>\n                                    <small ng-if=\"e.statusText\">{{e.statusText}}</small>\n                                    <code  ng-if=\"e.config.url\">{{e.config.url}}</code>\n                              \n                                </p>\n                                <div ng-if=\"e.json\">\n                                    <p class=\"lead\" ng-if=\"e.json.Message\">Messaggio: <em>{{e.json.Message}}</em></p>\n                                    <span ng-if=\"e.json.Source=='EntityFramework' && e.json.InnerException\"> \n                                        <ul ng-repeat=\"e in e.json.InnerException.Errors\">\n                                            <li>{{e.message}}</li>\n                                        </ul>\n                                    </span>\n                                    <div ng-if=\"e.json.ModelState\">\n                                        <dl ng-repeat=\"(key,errs) in e.json.ModelState\">\n                                            <dt>{{key}}</dt>\n                                            <dd>\n                                                    <ul class=\"list-unstyled\" style=\"margin:0\">\n                                                    <li ng-repeat=\"s in errs\">{{s}}</li>            \n                                        </ul>\n                                            </dd>\n                                        </dl> \n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        \n    "
                    });
                }
                return _this.$q.reject(rejection);
                var _a;
            };
            return _this;
        }
        Object.defineProperty(Interceptor.prototype, "$q", {
            get: function () {
                return this.$injectedArgs[Interceptor.$inject.indexOf("$q")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Interceptor.prototype, "$uibModal", {
            get: function () {
                return this.$injector.get("$uibModal");
            },
            enumerable: true,
            configurable: true
        });
        Interceptor.$inject = base_injectable_3.BaseInjectable.$inject.concat(["$q"]);
        return Interceptor;
    }(base_injectable_3.BaseInjectable));
    exports.Interceptor = Interceptor;
});
define("ng-helpers/http-error-to-modal/index", ["require", "exports", "ng-helpers/http-error-to-modal/interceptor"], function (require, exports, interceptor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        var factoryName = "HttpErrorToModalFactory";
        m.config([
            "$httpProvider",
            function ($httpProvider) {
                $httpProvider.interceptors.push(factoryName);
            }
        ]);
        var arr = [].concat(interceptor_1.Interceptor.$inject);
        arr.push(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (interceptor_1.Interceptor.bind.apply(interceptor_1.Interceptor, [void 0].concat(args)))();
        });
        m.factory(factoryName, arr);
    }
    exports.register = register;
});
define("ng-helpers/debug/debug-modal", ["require", "exports", "ng-helpers/utils/base-ctrl", "ng-helpers/utils/name-generator"], function (require, exports, base_ctrl_4, nameGenerator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var directiveName = nameGenerator.GetDirectiveName("debugModal");
    var dataKey = directiveName + "debugData";
    function register(m) {
        m.directive(directiveName, directive);
    }
    exports.register = register;
    function directive() {
        return {
            scope: {
                object: "="
            },
            controller: debugModalCtrl,
            controllerAs: "Ctrl",
            restrict: "E",
            template: "\n    <button class=\"btn btn-xs\" ng-click=\"Ctrl.open()\" ng-if=\"Ctrl.showDebugButton\" type=\"button\">\n<i class=\"fa fa-code\"></i>\n</button>\n"
        };
    }
    var debugModalCtrl = /** @class */ (function (_super) {
        __extends(debugModalCtrl, _super);
        function debugModalCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(debugModalCtrl.prototype, "data", {
            get: function () {
                return this.$scope["object"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(debugModalCtrl.prototype, "showDebugButton", {
            get: function () {
                return this.$ngUtils.$debugService.DebugStatus;
            },
            enumerable: true,
            configurable: true
        });
        debugModalCtrl.prototype.open = function () {
            var _this = this;
            this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: ModalCtrl,
                size: "lg",
                resolve: (_a = {},
                    _a[dataKey] = function () { return _this.data; },
                    _a),
                template: "\n            <div class=\"modal-header\">\n                <h3>Debug Modal</h3>\n            </div>\n            <div class=\"modal-body\">\n               <pre>{{Ctrl.data|json}}</pre>\n            </div>\n            "
            });
            var _a;
        };
        return debugModalCtrl;
    }(base_ctrl_4.BaseCtrl));
    var ModalCtrl = /** @class */ (function (_super) {
        __extends(ModalCtrl, _super);
        function ModalCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ModalCtrl.prototype, "data", {
            get: function () {
                return this.$injectedArgs[ModalCtrl.$inject.indexOf(dataKey)];
            },
            enumerable: true,
            configurable: true
        });
        ModalCtrl.$inject = base_ctrl_4.BaseCtrl.$inject.concat([dataKey]);
        return ModalCtrl;
    }(base_ctrl_4.BaseCtrl));
});
define("ng-helpers/formly/datepicker", ["require", "exports", "ng-helpers/utils/module-exists", "angular"], function (require, exports, moduleExists, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function camelize(s) {
        s = s.replace(/[\-_\s]+(.)?/g, function (match, chr) {
            return chr ? chr.toUpperCase() : "";
        });
        // Ensure 1st char is always lowercase
        return s.replace(/^([A-Z])/, function (match, chr) {
            return chr ? chr.toLowerCase() : "";
        });
    }
    function Configure(app) {
        moduleExists.configureModuleIfExists(app, ["ui.bootstrap"], function () {
            app.run(["formlyConfig", function (formlyConfig) {
                    var attributes = [
                        "date-disabled",
                        "custom-class",
                        "show-weeks",
                        "starting-day",
                        "init-date",
                        "min-mode",
                        "max-mode",
                        "format-day",
                        "format-month",
                        "format-year",
                        "format-day-header",
                        "format-day-title",
                        "format-month-title",
                        "year-range",
                        "shortcut-propagation",
                        "datepicker-popup",
                        "show-button-bar",
                        "current-text",
                        "clear-text",
                        "close-text",
                        "close-on-date-selection",
                        "datepicker-append-to-body"
                    ];
                    var bindings = [
                        "datepicker-mode",
                        "min-date",
                        "max-date"
                    ];
                    var ngModelAttrs = {};
                    angular.forEach(attributes, function (attr) {
                        ngModelAttrs[camelize(attr)] = { attribute: attr };
                    });
                    angular.forEach(bindings, function (binding) {
                        ngModelAttrs[camelize(binding)] = { bound: binding };
                    });
                    formlyConfig.setType({
                        name: "datepicker",
                        //language=html
                        template: "\n    <p class=\"input-group\">\n    <input  type=\"text\"\n    id=\"{{::id}}\"\n    name=\"{{::id}}\"\n    ng-model=\"model[options.key]\"\n    class=\"form-control\"\n    ng-click=\"datepicker.open($event)\"\n    uib-datepicker-popup=\"{{to.datepickerOptions.format}}\"\n    is-open=\"datepicker.opened\"\n    datepicker-options=\"to.datepickerOptions\" />\n    <span class=\"input-group-btn\">\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"datepicker.open($event)\" ng-disabled=\"to.disabled\">\n    <i class=\"glyphicon glyphicon-calendar\"></i>\n    </button>\n    </span>\n    </p>\n    ",
                        wrapper: ["bootstrapLabel", "bootstrapHasError"],
                        defaultOptions: {
                            ngModelAttrs: ngModelAttrs,
                            templateOptions: {
                                datepickerOptions: {
                                    format: "dd-MM-yyyy",
                                    initDate: new Date()
                                }
                            }
                        },
                        controller: ["$scope", function ($scope) {
                                $scope.datepicker = {};
                                $scope.datepicker.opened = false;
                                $scope.datepicker.open = function ($event) {
                                    $scope.datepicker.opened = !$scope.datepicker.opened;
                                };
                            }]
                    });
                }]);
        });
    }
    exports.Configure = Configure;
});
define("ng-helpers/formly/form-builder", ["require", "exports", "ng-helpers/utils/base-ctrl-for-directive"], function (require, exports, base_ctrl_for_directive_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.directive("formBuilder", directive);
    }
    exports.register = register;
    function directive() {
        return {
            //language=
            template: "\n<div class=\"form-builder\">\n<form name=\"f\" ng-submit=\"Ctrl.onSave()\" promise-btn>\n<fieldset>\n<legend>{{Ctrl.title}}</legend>\n<formly-form fields=\"Ctrl.fields\" model=\"Ctrl.model\"></formly-form>\n<ng-transclude></ng-transclude>\n<hr/>\n<button class=\"btn btn-primary\" ng-disabled=\"!f.$valid\">SALVA</button>\n</fieldset>\n</form>\n</div>\n",
            controller: Ctrl,
            controllerAs: "Ctrl",
            transclude: true,
            replace: true,
            scope: {
                model: "=",
                fields: "=",
                onSave: "&"
            }
        };
    }
    var Ctrl = /** @class */ (function (_super) {
        __extends(Ctrl, _super);
        function Ctrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Ctrl.prototype, "model", {
            get: function () {
                return this.$scope["model"];
            },
            set: function (v) {
                this.$scope["model"] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "fields", {
            get: function () {
                return this.$scope["fields"];
            },
            set: function (v) {
                this.$scope["fields"] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "title", {
            get: function () {
                return this.$attrs["title"] || null;
            },
            enumerable: true,
            configurable: true
        });
        Ctrl.prototype.onSave = function () {
            return this.$scope["onSave"]();
        };
        return Ctrl;
    }(base_ctrl_for_directive_2.BaseCtrlForDirective));
});
define("ng-helpers/formly/nullable-field-directive/ctrl", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ctrl = /** @class */ (function () {
        function Ctrl() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.args = [];
            this.fields = [
                {
                    key: "model",
                    type: "input",
                    templateOptions: {
                        label: "",
                        type: "" //settato dopo
                    }, expressionProperties: {
                        "templateOptions.disabled": function ($viewValue, $modelValue, scope) {
                            return !!scope.model["isNull"];
                        },
                        "templateOptions.required": function ($viewValue, $modelValue, scope) {
                            return !scope.model["isNull"];
                        }
                    }
                },
                {
                    key: "isNull",
                    type: "awesome-checkbox",
                    templateOptions: {
                        label: "Non impostato",
                        onChange: function ($viewValue, $modelValue, scope) {
                            if ($viewValue || $modelValue)
                                scope.model["model"] = null;
                        }
                    }
                }
            ];
            this.formModel = {
                isNull: false,
                model: null
            };
            this.args = args;
            this.fields[0].templateOptions.type = this.$type;
            this.fields[0].templateOptions.label = this.$label;
            delete this.formModel.model;
            var c = this;
            Object.defineProperty(this.formModel, "model", {
                get: function () {
                    return c.$model;
                },
                set: function (v) {
                    c.$model = v;
                }
            });
            this.formModel.isNull = this.$model == null;
        }
        Object.defineProperty(Ctrl.prototype, "$scope", {
            get: function () {
                return this.args[Ctrl.$inject.indexOf("$scope")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "$model", {
            get: function () {
                return this.$scope["model"];
            },
            set: function (v) {
                this.$scope["model"] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "$type", {
            get: function () {
                return this.$scope["type"] || "text";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "$label", {
            get: function () {
                return this.$scope["label"] || "";
            },
            enumerable: true,
            configurable: true
        });
        Ctrl.$inject = ["$scope"];
        return Ctrl;
    }());
    exports.Ctrl = Ctrl;
});
define("ng-helpers/formly/nullable-field-directive/directive", ["require", "exports", "ng-helpers/formly/nullable-field-directive/ctrl"], function (require, exports, ctrl_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.name = "nullableField";
    function directive() {
        return {
            controller: ctrl_2.Ctrl,
            controllerAs: "Ctrl",
            restrict: "E",
            //language=html
            template: "<formly-form model=\"Ctrl.formModel\" fields=\"Ctrl.fields\"></formly-form>",
            scope: {
                model: "=",
                type: "@",
                label: "@"
            }
        };
    }
    exports.directive = directive;
});
define("ng-helpers/formly/nullable-field-directive/index", ["require", "exports", "ng-helpers/formly/nullable-field-directive/directive"], function (require, exports, d) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        m.directive(d.name, d.directive);
    }
    exports.register = register;
});
define("ng-helpers/formly/index", ["require", "exports", "ng-helpers/formly/datepicker", "ng-helpers/formly/form-builder", "ng-helpers/formly/nullable-field-directive/index"], function (require, exports, dpConfig, formBuilder, nfd) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Configure(m) {
        m.run([
            "formlyValidationMessages",
            function (formlyValidationMessages) {
                formlyValidationMessages.addStringMessage("required", "Campo richiesto");
                formlyValidationMessages.messages["minlength"] = function ($viewValue, $modelValue, $scope) {
                    return !!$scope["to"].minlength
                        ? "Minimo " + $scope["to"].minlength + " caratteri"
                        : "";
                };
            }
        ]);
        m.run([
            "formlyConfig",
            function (formlyConfig) {
                formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = "fc.$dirty";
                formlyConfig.setType({
                    name: "awesome-checkbox",
                    //language=html
                    template: "\n            <div class=\"checkbox\">\n                <input type=\"checkbox\" class=\"formly-field-checkbox\" ng-model=\"model[options.key]\" id=\"{{options.id}}\">\n                <label for=\"{{options.id}}\">\n                    {{to.label}}\n                    {{to.required ? '*' : ''}}\n                </label>\n            </div>\n            "
                });
                formlyConfig.setWrapper({
                    name: "hasError",
                    types: ["input", "select"],
                    //language=html
                    template: "\n            <formly-transclude></formly-transclude>\n    \n            <div class=\"text-danger\" ng-messages=\"options.formControl.$error\" ng-if=\"options.validation.errorExistsAndShouldBeVisible\" >\n    <div class=\"error-message\" ng-message=\"{{::name}}\" ng-repeat=\"(name, message) in ::options.validation.messages\">\n    {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}\n    </div>\n    </div>\n    "
                });
            }
        ]);
        dpConfig.Configure(m);
        formBuilder.register(m);
        nfd.register(m);
    }
    exports.Configure = Configure;
});
//https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
define("polyfill/string-prototype", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (search, this_len) {
                if (this_len === void 0) { this_len = undefined; }
                if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                }
                return this.substring(this_len - search.length, this_len) === search;
            };
        }
    }
    exports.run = run;
});
define("polyfill/array-prototype", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        if (!Array.prototype.find) {
            Array.prototype.find = function (predicate) {
                if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function");
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;
                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
                return undefined;
            };
        }
    }
    exports.run = run;
});
define("polyfill/all", ["require", "exports", "polyfill/string-prototype", "polyfill/array-prototype"], function (require, exports, stringFn, arrayFn) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        stringFn.run();
        arrayFn.run();
    }
    exports.run = run;
});
define("ng-helpers/init", ["require", "exports", "ng-helpers/service", "ng-helpers/filters/index", "ng-helpers/utils/module-exists", "ng-helpers/fa-loading/index", "ng-helpers/promise-buttons/index", "ng-helpers/http-error-to-modal/index", "ng-helpers/debug/debug-service", "ng-helpers/debug/debug-modal", "ng-helpers/file-viewer", "ng-helpers/formly/index", "ng-helpers/async-loader", "polyfill/all"], function (require, exports, ngUtils, filters, moduleExists, faLoading, promiseButton, HttpErrorToModal, debugService, debugModal, fileViewer, formly, asyncLoader, polyfill) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function init(m) {
        polyfill.run();
        debugService.register(m);
        asyncLoader.register(m);
        ngUtils.register(m);
        filters.RegisterAllFilters(m);
        faLoading.register(m);
        moduleExists.configureModuleIfExists(m, ["formly"], function () {
            formly.Configure(m);
        });
        moduleExists.configureModuleIfExists(m, ["angularPromiseButtons"], function () {
            promiseButton.Configure(m);
        });
        moduleExists.configureModuleIfExists(m, ["ui.bootstrap"], function () {
            HttpErrorToModal.register(m);
            debugModal.register(m);
            fileViewer.register(m);
        });
    }
    exports.init = init;
});
define("ng-helpers/formly/nullable-date", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function NullableDate(key, label) {
        console &&
            console.warn &&
            console.warn("Usare la directive nullabled-field anzichè la funzione nullableDate");
        return [
            {
                key: key,
                type: "input",
                templateOptions: {
                    type: "datetime-local",
                    label: label
                },
                expressionProperties: {
                    "templateOptions.disabled": function ($viewValue, $modelValue, scope) {
                        return !!scope.model["Not" + key];
                    },
                    "templateOptions.required": function ($viewValue, $modelValue, scope) {
                        return !scope.model["Not" + key];
                    }
                }
            },
            {
                key: "Not" + key,
                type: "awesome-checkbox",
                templateOptions: {
                    label: "Senza " + label,
                    onChange: function ($viewValue, $modelValue, scope) {
                        if ($viewValue || $modelValue)
                            scope.model[key] = null;
                    }
                },
            }
        ];
    }
    exports.NullableDate = NullableDate;
});
define("ng-helpers/utils/base-service", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/service"], function (require, exports, base_injectable_4, ngUtilsService) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseService = /** @class */ (function (_super) {
        __extends(BaseService, _super);
        function BaseService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseService.prototype, "$ngUtils", {
            get: function () {
                return this.$injectedArgs[BaseService.$inject.indexOf(ngUtilsService.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "$uibModal", {
            get: function () {
                return this.$ngUtils.$uibModal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseService.prototype, "$q", {
            get: function () {
                return this.$ngUtils.$q;
            },
            enumerable: true,
            configurable: true
        });
        BaseService.$inject = base_injectable_4.BaseInjectable.$inject.concat([ngUtilsService.serviceName]);
        return BaseService;
    }(base_injectable_4.BaseInjectable));
    exports.BaseService = BaseService;
});
define("random-helpers/string", ["require", "exports"], function (require, exports) {
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
