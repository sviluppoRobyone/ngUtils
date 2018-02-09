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
define("js-helpers/debug-detectors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DebugName = "DEBUG";
    function IsLocalhost() {
        return window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1";
    }
    exports.IsLocalhost = IsLocalhost;
    function IsLocalDomain() {
        return window.location.hostname.endsWith(".local");
    }
    exports.IsLocalDomain = IsLocalDomain;
    function IsWindowDebugDefined() {
        return typeof window[exports.DebugName] !== "undefined";
    }
    exports.IsWindowDebugDefined = IsWindowDebugDefined;
    function GetWindowDebugValue() {
        if (!IsWindowDebugDefined())
            throw "[" + exports.DebugName + "] must be defined in window: window." + exports.DebugName + "=true/false;";
        return window[exports.DebugName];
    }
    exports.GetWindowDebugValue = GetWindowDebugValue;
    function IsDebugEnabled() {
        return IsWindowDebugDefined() ? GetWindowDebugValue() : (IsLocalhost() || IsLocalDomain());
    }
    exports.IsDebugEnabled = IsDebugEnabled;
    exports.status = {
        get IsLocalhost() {
            return IsLocalhost();
        },
        get IsLocalDomain() {
            return IsLocalDomain();
        },
        get IsWindowDebugDefined() {
            return IsWindowDebugDefined();
        },
        get GetWindowDebugValue() {
            return IsWindowDebugDefined() ? window[exports.DebugName] : null;
        },
        get IsDebugEnabled() {
            return IsDebugEnabled();
        }
    };
});
define("js-helpers/file-helpers", ["require", "exports"], function (require, exports) {
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
define("js-helpers/json-helpers", ["require", "exports"], function (require, exports) {
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
define("js-helpers/obj-helpers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseObj = /** @class */ (function () {
        function BaseObj() {
            this._objInfo = null;
            this._objInfo = new ObjInfo(this);
            Object.defineProperty(this, "_objInfo", { enumerable: false });
        }
        return BaseObj;
    }());
    exports.default = BaseObj;
    var ObjInfo = /** @class */ (function () {
        function ObjInfo(obj) {
            this.obj = null;
            this.obj = obj;
        }
        Object.defineProperty(ObjInfo.prototype, "ObjConstructor", {
            get: function () {
                return this.obj.constructor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjInfo.prototype, "ClassName", {
            get: function () {
                return this.obj.constructor.name;
            },
            enumerable: true,
            configurable: true
        });
        return ObjInfo;
    }());
    exports.ObjInfo = ObjInfo;
});
define("js-helpers/random-string", ["require", "exports"], function (require, exports) {
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
define("ng-helpers/log", ["require", "exports", "angular", "js-helpers/debug-detectors"], function (require, exports, angular, debug_detectors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(m) {
        m.config(["$logProvider", function ($logProvider) {
                var ide = debug_detectors_1.IsDebugEnabled();
                var $log = GetLogger();
                $log.debug("Enviroment debug", JSON.stringify(debug_detectors_1.status));
                GetLogger().info("Set debug", ide ? "enabled" : "disabled");
                $logProvider.debugEnabled(ide);
            }]);
    }
    exports.default = configure;
    function GetLogger() {
        var $log = angular.injector(["ng"]).get("$log");
        return $log;
    }
    exports.GetLogger = GetLogger;
});
define("ng-helpers/utils/base-injectable", ["require", "exports", "ng-helpers/log", "js-helpers/obj-helpers"], function (require, exports, log_1, obj_helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseInjectable = /** @class */ (function (_super) {
        __extends(BaseInjectable, _super);
        function BaseInjectable() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this._store = {};
            _this._args = [];
            _this._args = args;
            ["_store", "_args"].forEach(function (x) {
                Object.defineProperty(_this, x, { enumerable: false });
            });
            _this.checkInit();
            return _this;
        }
        Object.defineProperty(BaseInjectable.prototype, "_self$inject", {
            get: function () {
                return this._objInfo.ObjConstructor.$inject;
            },
            enumerable: true,
            configurable: true
        });
        BaseInjectable.prototype.GetInjected = function (name) {
            return this.$injectedArgs[this._self$inject.indexOf(name)];
        };
        BaseInjectable.prototype.getFromInjector = function (key) {
            if (typeof key !== typeof "" || !key)
                log_1.GetLogger().error(this._objInfo.ClassName, "Error injecting not a string or null", key);
            if (!this._store[key])
                this._store[key] = this.$injector.get(key);
            return this._store[key];
        };
        BaseInjectable.prototype.checkInit = function () {
            var _this = this;
            this.$log.debug(this._objInfo.ClassName, "Init");
            this.$log.debug(this._objInfo.ClassName, "Args[" + this.$injectedArgs.length + "]", this.$injectedArgs, this.$injectedArgs.describe().asJSON());
            if (this._self$inject) {
                this.$log.debug(this._objInfo.ClassName, "$inject[" + this._self$inject.length + "]", this._self$inject);
                if (this.$injectedArgs.length != this._self$inject.length) {
                    this.$log.error(this._objInfo.ClassName, "Incongruenza dipendenze", "Richieste: ", this._self$inject.length, "Passate: ", this.$injectedArgs.length);
                }
                this._self$inject.filter(function (x, index) { return !_this.$injectedArgs[index]; }).forEach(function (x, index) {
                    _this.$log.error(_this._objInfo.ClassName, "La dipendenza", x, "non è stata soddisfatta", _this.$injectedArgs[index]);
                });
            }
            else {
                this.$log.debug(this._objInfo.ClassName, "No $inject array detected");
            }
        };
        Object.defineProperty(BaseInjectable.prototype, "$injector", {
            get: function () {
                return this.GetInjected("$injector");
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
        Object.defineProperty(BaseInjectable.prototype, "$rootScope", {
            get: function () {
                return this.getFromInjector("$rootScope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$http", {
            get: function () {
                return this.getFromInjector("$http");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$location", {
            get: function () {
                return this.getFromInjector("$location");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$q", {
            get: function () {
                return this.getFromInjector("$q");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$filter", {
            get: function () {
                return this.getFromInjector("$filter");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$timeout", {
            get: function () {
                return this.getFromInjector("$timeout");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$cacheFactory", {
            get: function () {
                return this.getFromInjector("$cacheFactory");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$locale", {
            get: function () {
                return this.getFromInjector("$locale");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$interval", {
            get: function () {
                return this.getFromInjector("$interval");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$log", {
            get: function () {
                return this.getFromInjector("$log");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$sce", {
            get: function () {
                return this.getFromInjector("$sce");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$Upload", {
            get: function () {
                return this.getFromInjector("Upload");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$stateParams", {
            get: function () {
                return this.getFromInjector("$stateParams");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$state", {
            get: function () {
                return this.getFromInjector("$state");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseInjectable.prototype, "$uibModal", {
            get: function () {
                return this.getFromInjector("$uibModal");
            },
            enumerable: true,
            configurable: true
        });
        BaseInjectable.$inject = ["$injector"];
        return BaseInjectable;
    }(obj_helpers_1.default));
    exports.default = BaseInjectable;
});
define("ng-helpers/core", ["require", "exports", "ng-helpers/log"], function (require, exports, log_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function CheckInject(obj) {
        if (obj["$inject"]) {
            var getInject = function () {
                return (obj["$inject"] || []);
            };
            if (getInject().some(function (x) { return (typeof x != typeof ""); })) {
                $log.warn(obj._objInfo.ClassName, "Injecting some wrong value", getInject());
            }
            else {
                $log.debug(obj._objInfo.ClassName, "Check inject passed");
            }
        }
    }
    var $log = log_2.GetLogger();
    function registerDirective(m, directiveName, directive) {
        $log.debug("Registering directive", directiveName, "inside module", m.name, directive);
        m.directive(directiveName, directive);
    }
    exports.registerDirective = registerDirective;
    function registerService(m, serviceName, service) {
        var s = service;
        CheckInject(s);
        $log.debug("Registering service", s, "inside module", m.name, s, service["$inject"] || "No $inject found", s._objInfo.ClassName);
        m.service(serviceName, service);
    }
    exports.registerService = registerService;
    function ConcatenaInject() {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        var MyNewArray = [].concat.apply([], arrays);
        $log.debug("Concatenating", arrays, "in", MyNewArray);
        return MyNewArray;
    }
    exports.ConcatenaInject = ConcatenaInject;
});
define("ng-helpers/file-viewer", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/core"], function (require, exports, base_injectable_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configKey = "fileToView";
    exports.serviceName = "fileViewer";
    function register(m) {
        core_1.registerService(m, exports.serviceName, fileViewerService);
    }
    exports.default = register;
    var fileViewerService = /** @class */ (function (_super) {
        __extends(fileViewerService, _super);
        function fileViewerService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        fileViewerService.prototype.viewFile = function (config) {
            return this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: ModalCtrl,
                size: "file",
                resolve: (_a = {},
                    _a[configKey] = function () { return config; },
                    _a),
                template: "\n                        <div class=\"modal-header\">\n                            <h3>{{Ctrl.config.Title}}</h3>\n                        </div>\n                        <div class=\"modal-body\">\n                            <div class=\"embed-responsive embed-responsive-4by3\">\n                              <iframe class=\"embed-responsive-item\" ng-if=\"Ctrl.dataUri\" ng-src=\"{{Ctrl.dataUri|url}}\"></iframe>\n                            </div>\n                            \n                        </div>\n                        "
            });
            var _a;
        };
        return fileViewerService;
    }(base_injectable_1.default));
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
        Object.defineProperty(ModalCtrl.prototype, "config", {
            get: function () {
                return this.$injectedArgs[ModalCtrl.$inject.indexOf(configKey)];
            },
            enumerable: true,
            configurable: true
        });
        ModalCtrl.prototype.buildDataUri = function () {
            var _this = this;
            var f = new File([this.config.Blob], this.config.FileName, { type: this.config.MimeType });
            var reader = new FileReader();
            reader.onload = function () {
                _this.dataUri = reader.result;
            };
            reader.readAsDataURL(f);
        };
        ModalCtrl.$inject = base_injectable_1.default.$inject.concat([configKey]);
        return ModalCtrl;
    }(base_injectable_1.default));
});
//https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
define("polyfill/string-polyfill", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        polifyll_ENDSWITH();
        capitalize();
    }
    exports.default = run;
    function polifyll_ENDSWITH() {
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
    function capitalize() {
        if (!String.prototype.capitalize) {
            String.prototype.capitalize = function () {
                return this.charAt(0).toUpperCase() + this.slice(1);
            };
        }
    }
});
define("polyfill/array-polyfill", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        polyfill_FIND();
        custom_ClearAndSet();
        custom_Clear();
        describe();
        asJSON();
    }
    exports.default = run;
    function asJSON() {
        if (!Array.prototype.asJSON) {
            Array.prototype.asJSON = function () {
                return JSON.stringify(this);
            };
        }
    }
    function describe() {
        if (!Array.prototype.describe) {
            Array.prototype.describe = function () {
                return this.map(function (x) {
                    return (typeof x === typeof {} ? x.constructor.name : typeof x) + "";
                });
            };
        }
    }
    function custom_ClearAndSet() {
        if (!Array.prototype.clearAndSet) {
            Array.prototype.clearAndSet = function (newData) {
                if (!(newData instanceof Array)) {
                    throw new TypeError("newData must be an array");
                }
                var arr = this;
                arr.clear();
                arr.push.apply(arr, newData);
                return arr;
            };
        }
    }
    function custom_Clear() {
        if (!Array.prototype.clear) {
            Array.prototype.clear = function () {
                var list = this;
                list.splice(0, list.length);
                return list;
            };
        }
    }
    function polyfill_FIND() {
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
});
define("polyfill/index", ["require", "exports", "polyfill/string-polyfill", "polyfill/array-polyfill"], function (require, exports, string_polyfill_1, array_polyfill_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        string_polyfill_1.default();
        array_polyfill_1.default();
    }
    exports.default = run;
});
define("ng-helpers/utils/name-generator", ["require", "exports", "polyfill/index", "ng-helpers/log"], function (require, exports, index_1, log_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var prefix = "$ngu";
    index_1.default();
    var $log = log_3.GetLogger();
    function GetServiceName(name) {
        var n = prefix + (name.capitalize()) + "Service";
        $log.debug("Generating service name from", name, "to", n);
        return n;
    }
    exports.GetServiceName = GetServiceName;
    function GetDirectiveName(name) {
        return name;
    }
    exports.GetDirectiveName = GetDirectiveName;
});
define("ng-helpers/events", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/utils/name-generator"], function (require, exports, base_injectable_2, name_generator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = name_generator_1.GetServiceName("events");
    function register(m) {
        m.service(exports.serviceName, EventsService);
    }
    exports.register = register;
    var EventsService = /** @class */ (function (_super) {
        __extends(EventsService, _super);
        function EventsService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EventsService.prototype.emit = function (e) {
            this.$log.debug("Emit event", e);
            this.$rootScope.$broadcast(e + "");
        };
        EventsService.prototype.on = function (e, f) {
            var _this = this;
            this.$rootScope.$on(e, function (ae) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                _this.$log.debug("Detect event", e);
                f.apply(void 0, [ae].concat(args));
            });
        };
        return EventsService;
    }(base_injectable_2.default));
    exports.EventsService = EventsService;
});
define("ng-helpers/service", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/file-viewer", "ng-helpers/utils/name-generator", "ng-helpers/async-loader", "ng-helpers/core", "ng-helpers/events"], function (require, exports, base_injectable_3, fv, nameGenerator, AsyncLoader, core_2, events) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = nameGenerator.GetServiceName("ngUtils");
    function register(m) {
        core_2.registerService(m, exports.serviceName, NgUtilsService);
    }
    exports.default = register;
    var NgUtilsService = /** @class */ (function (_super) {
        __extends(NgUtilsService, _super);
        function NgUtilsService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(NgUtilsService.prototype, "$events", {
            get: function () {
                return this.$injectedArgs[NgUtilsService.$inject.indexOf(events.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgUtilsService.prototype, "$fileViewer", {
            get: function () {
                return this.$injectedArgs[NgUtilsService.$inject.indexOf(fv.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgUtilsService.prototype, "$asyncLoader", {
            get: function () {
                return this.$injectedArgs[NgUtilsService.$inject.indexOf(AsyncLoader.serviceName)];
            },
            enumerable: true,
            configurable: true
        });
        ///@deprecated
        NgUtilsService.prototype.manageAjaxLoading = function (before, ajax, after) {
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
        NgUtilsService.prototype.onScopeDispose = function ($scope) {
            var q = this.$q.defer();
            $scope.$on("$destroy", function () {
                q.resolve();
            });
            return q.promise;
        };
        NgUtilsService.$inject = core_2.ConcatenaInject(base_injectable_3.default.$inject, AsyncLoader.serviceName, fv.serviceName, events.serviceName);
        return NgUtilsService;
    }(base_injectable_3.default));
    exports.NgUtilsService = NgUtilsService;
});
define("ng-helpers/utils/base-ctrl", ["require", "exports", "ng-helpers/service", "ng-helpers/utils/base-injectable", "ng-helpers/log", "ng-helpers/core"], function (require, exports, ngUtils, base_injectable_4, log_4, core_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    log_4.GetLogger().debug("BASECTRL", ngUtils, ngUtils.serviceName, base_injectable_4.default.$inject);
    var BaseCtrl = /** @class */ (function (_super) {
        __extends(BaseCtrl, _super);
        function BaseCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseCtrl.prototype, "$scope", {
            get: function () {
                return this.GetInjected("$scope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseCtrl.prototype, "$ngUtils", {
            get: function () {
                return this.GetInjected(ngUtils.serviceName);
            },
            enumerable: true,
            configurable: true
        });
        BaseCtrl.$inject = core_3.ConcatenaInject(base_injectable_4.default.$inject, "$scope", ngUtils.serviceName);
        return BaseCtrl;
    }(base_injectable_4.default));
    exports.default = BaseCtrl;
    log_4.GetLogger().debug("BASECTRL 2", BaseCtrl);
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
        Object.defineProperty(BaseCtrlForDirective.prototype, "$element", {
            get: function () {
                return this.$injectedArgs[BaseCtrlForDirective.$inject.indexOf("$element")];
            },
            enumerable: true,
            configurable: true
        });
        BaseCtrlForDirective.$inject = base_ctrl_1.default.$inject.concat("$attrs", "$element");
        return BaseCtrlForDirective;
    }(base_ctrl_1.default));
    exports.default = BaseCtrlForDirective;
});
define("ng-helpers/async-loader", ["require", "exports", "ng-helpers/utils/name-generator", "ng-helpers/utils/base-injectable", "ng-helpers/core", "ng-helpers/utils/base-ctrl-for-directive"], function (require, exports, nameGenerator, base_injectable_5, core_4, base_ctrl_for_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceName = nameGenerator.GetServiceName("AsyncLoader");
    function register(m) {
        core_4.registerService(m, exports.serviceName, AsyncLoaderService);
        directive.register(m);
    }
    exports.default = register;
    var Config = /** @class */ (function () {
        function Config() {
            this.isLoading = false;
            this.isSuccess = false;
            this.isFailed = false;
            this.dafaultValue = null;
            this.successCount = 0;
            this.GetDataFn = null;
        }
        return Config;
    }());
    exports.Config = Config;
    var AsyncLoader = /** @class */ (function (_super) {
        __extends(AsyncLoader, _super);
        function AsyncLoader() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.internalData = null;
            _this.config = new Config();
            ["internalData", "config"].forEach(function (x) {
                Object.defineProperty(_this, x, { enumerable: false });
            });
            return _this;
        }
        Object.defineProperty(AsyncLoader.prototype, "IsLoading", {
            get: function () {
                return this.config.isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsSuccess", {
            get: function () {
                return this.config.isSuccess;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "IsFailed", {
            get: function () {
                return this.config.isFailed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AsyncLoader.prototype, "Data", {
            get: function () {
                return this.internalData;
            },
            enumerable: true,
            configurable: true
        });
        AsyncLoader.prototype.SetDataFunction = function (fn, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            this.config.GetDataFn = fn;
            this.config.dafaultValue = defaultValue;
            if (this.config.dafaultValue != null) {
                this.internalData = this.config.dafaultValue;
            }
        };
        AsyncLoader.prototype.assignValue = function (data) {
            if (data instanceof Array && this.internalData instanceof Array) {
                this.internalData.splice(0, this.internalData.length);
                (_a = this.internalData).push.apply(_a, data);
            }
            else {
                this.internalData = data;
            }
            var _a;
        };
        AsyncLoader.prototype.Update = function () {
            var _this = this;
            return this.$q(function (ok, ko) {
                _this.$timeout(function () {
                    _this.config.isLoading = true;
                    _this.config.isSuccess = false;
                    _this.config.isFailed = false;
                }).then(function () {
                    _this.$q(_this.config.GetDataFn).then(function (data) {
                        _this.assignValue(data);
                        _this.$timeout(function () {
                            _this.config.successCount++;
                            _this.config.isLoading = false;
                            _this.config.isSuccess = true;
                            _this.config.isFailed = false;
                        }).then(function () {
                            ok();
                        });
                    }).catch(function () {
                        _this.internalData = _this.config.dafaultValue;
                        _this.$timeout(function () {
                            _this.config.isLoading = false;
                            _this.config.isSuccess = false;
                            _this.config.isFailed = true;
                        }).then(function () {
                            ko();
                        });
                    });
                });
            });
        };
        return AsyncLoader;
    }(base_injectable_5.default));
    exports.AsyncLoader = AsyncLoader;
    var AsyncLoaderService = /** @class */ (function (_super) {
        __extends(AsyncLoaderService, _super);
        function AsyncLoaderService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AsyncLoaderService.prototype.Create = function (f, initValue) {
            if (initValue === void 0) { initValue = null; }
            var loader = new (AsyncLoader.bind.apply(AsyncLoader, [void 0].concat(this.$injectedArgs)))();
            loader.SetDataFunction(f, initValue);
            return loader;
        };
        return AsyncLoaderService;
    }(base_injectable_5.default));
    exports.AsyncLoaderService = AsyncLoaderService;
    var directive;
    (function (directive_1) {
        directive_1.directiveName = nameGenerator.GetDirectiveName("asyncLoader");
        function register(m) {
            core_4.registerDirective(m, directive_1.directiveName, directive);
        }
        directive_1.register = register;
        var scopeLoadersKey = "loaders";
        function directive() {
            return {
                template: "\n        \n            <span ng-transclude=\"content\" ng-if=\"Ctrl.IsSuccess\"></span>\n            <span ng-transclude=\"loading\" ng-if=\"Ctrl.IsLoading\"></span>\n            <span ng-if=\"Ctrl.IsFailed\">\n                Errore\n            </span>\n            ",
                scope: (_a = {},
                    _a[scopeLoadersKey] = "=",
                    _a),
                controller: AsyncLoaderDirectiveCtrl,
                controllerAs: "Ctrl",
                transclude: {
                    loading: "loading",
                    content: "content"
                }
            };
            var _a;
        }
        var AsyncLoaderDirectiveCtrl = /** @class */ (function (_super) {
            __extends(AsyncLoaderDirectiveCtrl, _super);
            function AsyncLoaderDirectiveCtrl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(AsyncLoaderDirectiveCtrl.prototype, "loaders", {
                get: function () {
                    return this.$scope[scopeLoadersKey] && this.$scope[scopeLoadersKey] instanceof Array ? this.$scope[scopeLoadersKey] : [this.$scope[scopeLoadersKey]];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AsyncLoaderDirectiveCtrl.prototype, "AsyncLoaders", {
                get: function () {
                    return this.loaders.filter(function (x) { return x instanceof AsyncLoader; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AsyncLoaderDirectiveCtrl.prototype, "IsLoading", {
                get: function () {
                    return this.AsyncLoaders.some(function (x) { return x.IsLoading; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AsyncLoaderDirectiveCtrl.prototype, "IsSuccess", {
                get: function () {
                    return this.AsyncLoaders.every(function (x) { return x.IsSuccess; });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AsyncLoaderDirectiveCtrl.prototype, "IsFailed", {
                get: function () {
                    return this.AsyncLoaders.some(function (x) { return x.IsFailed; });
                },
                enumerable: true,
                configurable: true
            });
            return AsyncLoaderDirectiveCtrl;
        }(base_ctrl_for_directive_1.default));
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
    exports.default = RegisterAllFilters;
});
define("ng-helpers/utils/module-exists", ["require", "exports", "ng-helpers/log"], function (require, exports, log_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function moduleExists(m, names) {
        return names.every(function (x) { return m.requires.some(function (y) { return y == x; }); });
    }
    exports.moduleExists = moduleExists;
    function configureModuleIfExists(m, moduleNames, fn) {
        var $log = log_5.GetLogger();
        if (moduleExists(m, moduleNames)) {
            try {
                fn();
            }
            catch (e) {
                $log.error("NgUtils: error configuring module " + JSON.stringify(moduleNames));
                $log.error(e);
            }
        }
        else {
            $log.debug("NgUtils: module configuration " +
                moduleNames.asJSON() +
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
    }(base_ctrl_2.default));
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
define("ng-helpers/fa-loading/index", ["require", "exports", "ng-helpers/fa-loading/directive", "jquery", "ng-helpers/fa-loading/themes", "ng-helpers/core"], function (require, exports, directive, $, themes_1, core_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        core_5.registerDirective(m, directive.directiveName, directive.directive);
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
                core_5.registerDirective(m, dirName, themes_1.baseTheme.DirectiveBuilder(html));
            });
        });
    }
    exports.default = register;
});
define("ng-helpers/promise-buttons/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Configure(m) {
        m.config(["angularPromiseButtonsProvider", function (angularPromiseButtonsProvider) {
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
    exports.default = Configure;
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
        Ctrl.$inject = base_ctrl_3.default.$inject.concat([exports.ErrorKey]);
        return Ctrl;
    }(base_ctrl_3.default));
    exports.Ctrl = Ctrl;
});
define("ng-helpers/http-error-to-modal/interceptor", ["require", "exports", "ng-helpers/http-error-to-modal/modal-ctrl", "ng-helpers/utils/base-injectable"], function (require, exports, ModalController, base_injectable_6) {
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
        return Interceptor;
    }(base_injectable_6.default));
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
    exports.default = register;
});
define("ng-helpers/debug/debug-modal", ["require", "exports", "ng-helpers/utils/name-generator", "ng-helpers/core", "ng-helpers/utils/module-exists", "ng-helpers/utils/base-ctrl-for-directive", "ng-helpers/utils/base-ctrl"], function (require, exports, nameGenerator, core_6, module_exists_1, base_ctrl_for_directive_2, base_ctrl_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var directiveName = nameGenerator.GetDirectiveName("debugModal");
    var dataKey = directiveName + "debugData";
    function register(m) {
        module_exists_1.configureModuleIfExists(m, ["ui.bootstrap"], function () {
            core_6.registerDirective(m, directiveName, directive);
        });
    }
    exports.default = register;
    function directive() {
        return {
            scope: {
                object: "="
            },
            controller: debugModalCtrl,
            controllerAs: "Ctrl",
            restrict: "E",
            template: "<if-debug>\n            <button class=\"btn btn-xs\" ng-click=\"Ctrl.open()\"type=\"button\">\n                <i class=\"fa fa-code\"></i>\n            </button>\n        </if-debug>\n        "
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
        Object.defineProperty(debugModalCtrl.prototype, "DebuggedVariable", {
            get: function () {
                return this.$element.attr("object");
            },
            enumerable: true,
            configurable: true
        });
        debugModalCtrl.prototype.open = function () {
            var _this = this;
            this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: DebugModalContentCtrl,
                size: "lg",
                resolve: (_a = {},
                    _a[dataKey] = function () { return _this.data; },
                    _a),
                template: "\n            <div class=\"modal-header\">\n                <h3>Debug Modal <code>" + this.DebuggedVariable + "</code></h3>\n            </div>\n            <div class=\"modal-body\">\n               <pre>{{Ctrl.data|json}}</pre>\n            </div>\n            "
            });
            var _a;
        };
        return debugModalCtrl;
    }(base_ctrl_for_directive_2.default));
    var DebugModalContentCtrl = /** @class */ (function (_super) {
        __extends(DebugModalContentCtrl, _super);
        function DebugModalContentCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DebugModalContentCtrl.prototype, "data", {
            get: function () {
                return this.$injectedArgs[DebugModalContentCtrl.$inject.indexOf(dataKey)];
            },
            enumerable: true,
            configurable: true
        });
        DebugModalContentCtrl.$inject = base_ctrl_4.default.$inject.concat([dataKey]);
        return DebugModalContentCtrl;
    }(base_ctrl_4.default));
});
define("ng-helpers/debug/debug-components", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/core", "ng-helpers/utils/name-generator", "js-helpers/debug-detectors"], function (require, exports, base_injectable_7, core_7, name_generator_2, debug_detectors_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        ifDebug.register(m);
    }
    exports.default = register;
    var ifDebug;
    (function (ifDebug) {
        ifDebug.directiveName = name_generator_2.GetDirectiveName("ifDebug");
        function register(m) {
            core_7.registerDirective(m, ifDebug.directiveName, Directive);
        }
        ifDebug.register = register;
        function Directive() {
            return {
                restrict: "E",
                controller: IfDebugCtrl,
                controllerAs: "Ctrl",
                transclude: true,
                scope: {},
                template: "<ng-transclude ng-if=\"Ctrl.Debug\" class=\"if-debug\"></ng-transclude>"
            };
        }
        var IfDebugCtrl = /** @class */ (function (_super) {
            __extends(IfDebugCtrl, _super);
            function IfDebugCtrl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(IfDebugCtrl.prototype, "Debug", {
                get: function () {
                    return debug_detectors_2.IsDebugEnabled();
                },
                enumerable: true,
                configurable: true
            });
            return IfDebugCtrl;
        }(base_injectable_7.default));
    })(ifDebug = exports.ifDebug || (exports.ifDebug = {}));
    var ifNotDebug;
    (function (ifNotDebug) {
        ifNotDebug.directiveName = name_generator_2.GetDirectiveName("ifNotDebug");
        function register(m) {
            core_7.registerDirective(m, ifNotDebug.directiveName, Directive);
        }
        ifNotDebug.register = register;
        function Directive() {
            return {
                restrict: "E",
                controller: IfDebugCtrl,
                controllerAs: "Ctrl",
                transclude: true,
                scope: {},
                template: "<ng-transclude ng-if=\"!Ctrl.Debug\" class=\"if-debug\"></ng-transclude>"
            };
        }
        var IfDebugCtrl = /** @class */ (function (_super) {
            __extends(IfDebugCtrl, _super);
            function IfDebugCtrl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(IfDebugCtrl.prototype, "Debug", {
                get: function () {
                    return debug_detectors_2.IsDebugEnabled();
                },
                enumerable: true,
                configurable: true
            });
            return IfDebugCtrl;
        }(base_injectable_7.default));
    })(ifNotDebug = exports.ifNotDebug || (exports.ifNotDebug = {}));
});
define("ng-helpers/debug/debug", ["require", "exports", "ng-helpers/debug/debug-modal", "ng-helpers/debug/debug-components"], function (require, exports, debug_modal_1, debug_components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Register(m) {
        debug_components_1.default(m);
        debug_modal_1.default(m);
    }
    exports.default = Register;
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
define("ng-helpers/formly/form-builder", ["require", "exports", "ng-helpers/utils/base-ctrl-for-directive", "ng-helpers/core"], function (require, exports, base_ctrl_for_directive_3, core_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function register(m) {
        core_8.registerDirective(m, "formBuilder", directive);
    }
    exports.default = register;
    function directive() {
        return {
            //language=
            template: "\n<div class=\"form-builder\">\n<form name=\"f\" ng-submit=\"Ctrl.onSave()\" promise-btn>\n<fieldset>\n<legend>{{Ctrl.title}}</legend>\n<formly-form fields=\"Ctrl.fields\" model=\"Ctrl.model\"></formly-form>\n<ng-transclude></ng-transclude>\n<hr/>\n<button class=\"btn btn-primary\" ng-disabled=\"!f.$valid\">\n<i class=\"fa {{Ctrl.SaveButtonIcon}}\" ></i>\n{{Ctrl.SaveButtonText}}\n</button>\n</fieldset>\n</form>\n</div>\n",
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
        Object.defineProperty(Ctrl.prototype, "SaveButtonText", {
            get: function () {
                return this.$attrs["saveButtonText"] || "Salva";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ctrl.prototype, "SaveButtonIcon", {
            get: function () {
                return this.$attrs["saveButtonIcon"] || "fa-save";
            },
            enumerable: true,
            configurable: true
        });
        Ctrl.prototype.onSave = function () {
            return this.$scope["onSave"]();
        };
        return Ctrl;
    }(base_ctrl_for_directive_3.default));
});
define("ng-helpers/formly/nullable-field-directive", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/core"], function (require, exports, base_injectable_8, core_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var directiveName = "nullableField";
    function register(m) {
        core_9.registerDirective(m, directiveName, directive);
    }
    exports.default = register;
    function directive() {
        return {
            controller: NullableFieldCtrl,
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
    var NullableFieldCtrl = /** @class */ (function (_super) {
        __extends(NullableFieldCtrl, _super);
        function NullableFieldCtrl() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.fields = [
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
            _this.formModel = {
                isNull: false,
                model: null
            };
            _this.fields[0].templateOptions.type = _this.$type;
            _this.fields[0].templateOptions.label = _this.$label;
            delete _this.formModel.model;
            var c = _this;
            Object.defineProperty(_this.formModel, "model", {
                get: function () {
                    return c.$model;
                },
                set: function (v) {
                    c.$model = v;
                }
            });
            _this.formModel.isNull = _this.$model == null;
            return _this;
        }
        Object.defineProperty(NullableFieldCtrl.prototype, "$scope", {
            get: function () {
                return this.$injectedArgs[NullableFieldCtrl.$inject.indexOf("$scope")];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NullableFieldCtrl.prototype, "$model", {
            get: function () {
                return this.$scope["model"];
            },
            set: function (v) {
                this.$scope["model"] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NullableFieldCtrl.prototype, "$type", {
            get: function () {
                return this.$scope["type"] || "text";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NullableFieldCtrl.prototype, "$label", {
            get: function () {
                return this.$scope["label"] || "";
            },
            enumerable: true,
            configurable: true
        });
        NullableFieldCtrl.$inject = base_injectable_8.default.$inject.concat(["$scope"]);
        return NullableFieldCtrl;
    }(base_injectable_8.default));
    exports.NullableFieldCtrl = NullableFieldCtrl;
});
define("ng-helpers/formly/index", ["require", "exports", "ng-helpers/formly/datepicker", "ng-helpers/formly/form-builder", "ng-helpers/formly/nullable-field-directive"], function (require, exports, dpConfig, form_builder_1, nullable_field_directive_1) {
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
        form_builder_1.default(m);
        nullable_field_directive_1.default(m);
    }
    exports.default = Configure;
});
define("ng-helpers/show-property", ["require", "exports", "ng-helpers/utils/base-ctrl-for-directive", "ng-helpers/utils/name-generator", "ng-helpers/core"], function (require, exports, base_ctrl_for_directive_4, name_generator_3, core_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.directiveName = name_generator_3.GetDirectiveName("showProperty");
    function register(m) {
        core_10.registerDirective(m, exports.directiveName, directive);
    }
    exports.default = register;
    function directive() {
        return {
            scope: {
                object: "="
            },
            controllerAs: "Ctrl",
            controller: ShowPropertyCtrl,
            //language=html
            template: "\n<!--\n       <debug-modal object=\"Ctrl.Object\"></debug-modal>\n<debug-modal object=\"Ctrl.PropertyName\"></debug-modal>\n<pre>{{Ctrl.Ready}}</pre>\n<pre>{{Ctrl.IsDefined}}</pre>\n-->\n         <span ng-if=\"!Ctrl.Ready\">\n            <i class=\"fa fa-spin fa-circle-o-notch\"></i>\n         </span>\n        <span ng-if=\"Ctrl.Ready\">\n        <span ng-if=\"Ctrl.IsDefined\" ng-switch=\"Ctrl.Type\">\n     \n            <span ng-switch-when=\"null\" >ND</span>\n\n            <span ng-switch-when=\"string\" >{{Ctrl.PropertyValue}}</span>\n\n            <span ng-switch-when=\"number\" >{{Ctrl.PropertyValue}}</span>\n\n            <span ng-switch-when=\"date\" >{{Ctrl.PropertyValue|date}}</span>\n\n            <span ng-switch-when=\"boolean\" >\n                {{Ctrl.PropertyValue?\"SI\":\"NO\"}}\n            </span>\n            <span ng-switch-when=\"object\" >\n                <code>[object]</code>\n               <debug-modal object=\"Ctrl.PropertyValue\"></debug-modal>\n            </span>\n                      <span ng-switch-default>It's something else</span>\n        </span>\n        <span ng-if=\"!Ctrl.IsDefined\" >\n        [{{Ctrl.PropertyName}}] is not defined\n        </span>\n\n        </span>\n         \n"
        };
    }
    exports.directive = directive;
    var ShowPropertyCtrl = /** @class */ (function (_super) {
        __extends(ShowPropertyCtrl, _super);
        function ShowPropertyCtrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ShowPropertyCtrl.prototype, "Object", {
            get: function () {
                return this.$scope["object"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShowPropertyCtrl.prototype, "PropertyName", {
            get: function () {
                return this.$attrs["propertyName"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShowPropertyCtrl.prototype, "PropertyValue", {
            get: function () {
                return this.Object[this.PropertyName];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShowPropertyCtrl.prototype, "Ready", {
            get: function () {
                return [this.Object, this.PropertyName].every(function (x) { return typeof x != "undefined" && x != null; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShowPropertyCtrl.prototype, "IsDefined", {
            get: function () {
                return this.Ready && !!this.Object[this.PropertyName];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShowPropertyCtrl.prototype, "Type", {
            get: function () {
                if (!this.IsDefined)
                    return "null";
                if (this.PropertyValue instanceof Array)
                    return "array";
                if (this.PropertyValue instanceof Date)
                    return "date";
                return typeof (this.PropertyValue);
            },
            enumerable: true,
            configurable: true
        });
        return ShowPropertyCtrl;
    }(base_ctrl_for_directive_4.default));
    exports.ShowPropertyCtrl = ShowPropertyCtrl;
});
define("ng-helpers/init", ["require", "exports", "ng-helpers/service", "ng-helpers/filters/index", "ng-helpers/utils/module-exists", "ng-helpers/fa-loading/index", "ng-helpers/promise-buttons/index", "ng-helpers/http-error-to-modal/index", "ng-helpers/debug/debug", "ng-helpers/file-viewer", "ng-helpers/formly/index", "ng-helpers/async-loader", "polyfill/index", "ng-helpers/events", "ng-helpers/show-property", "ng-helpers/log"], function (require, exports, service_1, index_2, moduleExists, index_3, index_4, index_5, debug_1, file_viewer_1, index_6, async_loader_1, index_7, events, show_property_1, log_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function init(m) {
        index_7.default();
        log_6.default(m);
        debug_1.default(m);
        async_loader_1.default(m);
        events.register(m);
        service_1.default(m);
        show_property_1.default(m);
        index_2.default(m);
        index_3.default(m);
        moduleExists.configureModuleIfExists(m, ["formly"], function () {
            index_6.default(m);
        });
        moduleExists.configureModuleIfExists(m, ["angularPromiseButtons"], function () {
            index_4.default(m);
        });
        moduleExists.configureModuleIfExists(m, ["ui.bootstrap"], function () {
            index_5.default(m);
            file_viewer_1.default(m);
        });
    }
    exports.default = init;
});
define("ng-helpers/utils/base-service", ["require", "exports", "ng-helpers/utils/base-injectable", "ng-helpers/service", "ng-helpers/core"], function (require, exports, base_injectable_9, ngUtilsService, core_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseService = /** @class */ (function (_super) {
        __extends(BaseService, _super);
        function BaseService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BaseService.prototype, "$ngUtils", {
            get: function () {
                return this.GetInjected(ngUtilsService.serviceName);
            },
            enumerable: true,
            configurable: true
        });
        BaseService.$inject = core_11.ConcatenaInject(base_injectable_9.default.$inject, ngUtilsService.serviceName);
        return BaseService;
    }(base_injectable_9.default));
    exports.default = BaseService;
});
