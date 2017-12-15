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
define(["require", "exports", "angular", "jquery"], function (require, exports, angular, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ngUtils;
    (function (ngUtils) {
        function moduleExists(m, name) {
            try {
                return !!angular.module(name) && m.requires.some(function (x) { return x == name; });
            }
            catch (e) {
                return false;
            }
        }
        ngUtils.moduleExists = moduleExists;
        var ngUtilsService = /** @class */ (function () {
            function ngUtilsService() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.args = null;
                this.store = {};
                this.args = args;
                Object.defineProperty(this, "args", { enumerable: false });
            }
            ngUtilsService.prototype.getFromInject = function (key) {
                if (!this.store[key])
                    this.store[key] = this.$injector.get(key);
                return this.store[key];
            };
            Object.defineProperty(ngUtilsService.prototype, "$injector", {
                get: function () {
                    return this.args[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$rootScope", {
                get: function () {
                    return this.getFromInject("$rootScope");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$http", {
                get: function () {
                    return this.getFromInject("$http");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$location", {
                get: function () {
                    return this.getFromInject("$location");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$routeParams", {
                get: function () {
                    return this.getFromInject("$routeParams");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$q", {
                get: function () {
                    return this.getFromInject("$q");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$filter", {
                get: function () {
                    return this.getFromInject("$filter");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$route", {
                get: function () {
                    return this.getFromInject("$route");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$timeout", {
                get: function () {
                    return this.getFromInject("$timeout");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$ngView", {
                get: function () {
                    return $("[ng-view]");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$cacheFactory", {
                get: function () {
                    return this.getFromInject("$cacheFactory");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$locale", {
                get: function () {
                    return this.getFromInject("$locale");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$interval", {
                get: function () {
                    return this.getFromInject("$interval");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$log", {
                get: function () {
                    return this.getFromInject("$log");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ngUtilsService.prototype, "$sce", {
                get: function () {
                    return this.getFromInject("$sce");
                },
                enumerable: true,
                configurable: true
            });
            ngUtilsService.prototype.manageAjaxLoading = function (before, ajax, after) {
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
            ngUtilsService.prototype.onScopeDispose = function ($scope) {
                var q = this.$q.defer();
                $scope.$on("$destroy", function () {
                    q.resolve();
                });
                return q.promise;
            };
            ngUtilsService.serviceName = "$ngUtils";
            ngUtilsService.$inject = ["$injector"];
            return ngUtilsService;
        }());
        ngUtils.ngUtilsService = ngUtilsService;
        var lib;
        (function (lib) {
            var BaseCtrl = /** @class */ (function () {
                function BaseCtrl() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    this.args = [];
                    this.args = args;
                }
                Object.defineProperty(BaseCtrl.prototype, "$scope", {
                    get: function () {
                        return this.args[BaseCtrl.$inject.indexOf("$scope")];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCtrl.prototype, "$ngUtils", {
                    get: function () {
                        return this.args[BaseCtrl.$inject.indexOf(ngUtilsService.serviceName)];
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
                BaseCtrl.$inject = ["$scope", ngUtilsService.serviceName];
                return BaseCtrl;
            }());
            lib.BaseCtrl = BaseCtrl;
        })(lib = ngUtils.lib || (ngUtils.lib = {}));
        function Init(m) {
            m.service(ngUtils.ngUtilsService.serviceName, ngUtils.ngUtilsService);
            ngUtils.filters.AllFilters(m);
            ngUtils.faLoading.register(m);
            configureModule(m, "formly", function () {
                ngUtils.formly.Configure(m);
                ngUtils.formly.directives.NullableFieldDirective.register(m);
                ngUtils.formly.directives.formBuilder.register(m);
            });
            configureModule(m, "angularPromiseButtons", function () {
                ngUtils.promiseButton.Configure(m);
            });
            configureModule(m, "ui.bootstrap", function () {
                ngUtils.HttpErrorToModal.register(m);
            });
        }
        ngUtils.Init = Init;
        function configureModule(m, moduleName, fn) {
            if (moduleExists(m, moduleName)) {
                try {
                    fn();
                }
                catch (e) {
                    console.error("NgUtils: error configuring module " + moduleName);
                    console.error(e);
                }
            }
            else {
                console.info("NgUtils: module configuration " + moduleName + " skipped");
            }
        }
        var filters;
        (function (filters) {
            function AllFilters(m) {
                [html, url, bytes].map(function (x) { return x(m); });
            }
            filters.AllFilters = AllFilters;
            function html(m) {
                m.filter("html", [
                    "$sce", function ($sce) {
                        return function (htmlCode) {
                            return $sce.trustAsHtml(htmlCode);
                        };
                    }
                ]);
            }
            filters.html = html;
            function url(m) {
                m.filter("url", [
                    "$sce", function ($sce) {
                        return function (url) {
                            return $sce.trustAsResourceUrl(url);
                        };
                    }
                ]);
            }
            filters.url = url;
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
            filters.bytes = bytes;
        })(filters = ngUtils.filters || (ngUtils.filters = {}));
        var HttpErrorToModal;
        (function (HttpErrorToModal) {
            //required module ui.bootstrap
            function register(m) {
                var factoryName = "HttpErrorToModalFactory";
                m.config(["$httpProvider",
                    function ($httpProvider) {
                        $httpProvider.interceptors.push(factoryName);
                    }
                ]);
                var arr = [].concat(Interceptor.$inject);
                arr.push(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return new (Interceptor.bind.apply(Interceptor, [void 0].concat(args)))();
                });
                m.factory(factoryName, arr);
            }
            HttpErrorToModal.register = register;
            var ModalController = /** @class */ (function () {
                function ModalController() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    this.args = [];
                    this.args = args;
                }
                Object.defineProperty(ModalController.prototype, "Errors", {
                    get: function () {
                        return this.args[ModalController.$inject.indexOf("errors")];
                    },
                    enumerable: true,
                    configurable: true
                });
                ModalController.$inject = ["errors", "$injector"];
                return ModalController;
            }());
            var Interceptor = /** @class */ (function () {
                function Interceptor() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _this = this;
                    this.args = [];
                    this.errorList = [];
                    this.$modal = null;
                    this.responseError = function (rejection) {
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
                                resolve: {
                                    errors: function () {
                                        return _this.errorList;
                                    }
                                },
                                controller: ModalController,
                                //language=html
                                template: "\n\n                    <div class=\"modal-header\">\n                        <h4 class=\"modal-title\" >\n                            Si \u00E8 verificato un errore\n                        </h3>\n                    </div>\n                    <div class=\"modal-body\">\n                        \n                        <div ng-repeat=\"e in Ctrl.Errors\" class=\"well well-sm\" >\n                        \n                            <p>\n                                <small ng-if=\"e.status\">{{e.status}}</small>\n                                <small ng-if=\"e.statusText\">{{e.statusText}}</small>\n                                <code  ng-if=\"e.config.url\">{{e.config.url}}</code>\n                          \n                            </p>\n\n                            <div ng-if=\"e.json\">\n                                <p class=\"lead\" ng-if=\"e.json.Message\">Messaggio: <em>{{e.json.Message}}</em></p>\n                                <div ng-if=\"e.json.ModelState\">\n                                    <dl ng-repeat=\"(key,errs) in e.json.ModelState\">\n                                        <dt>{{key}}</dt>\n                                        <dd>\n                                                <ul class=\"list-unstyled\" style=\"margin:0\">\n                                                <li ng-repeat=\"s in errs\">{{s}}</li>            \n                                    </ul>\n                                        </dd>\n                                    </dl> \n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    \n"
                            });
                        }
                        return _this.$q.reject(rejection);
                    };
                    this.args = args;
                }
                Object.defineProperty(Interceptor.prototype, "$injector", {
                    get: function () {
                        return this.args[Interceptor.$inject.indexOf("$injector")];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Interceptor.prototype, "$q", {
                    get: function () {
                        return this.args[Interceptor.$inject.indexOf("$q")];
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
                Interceptor.$inject = ["$q", "$injector"];
                return Interceptor;
            }());
        })(HttpErrorToModal = ngUtils.HttpErrorToModal || (ngUtils.HttpErrorToModal = {}));
        var formly;
        (function (formly) {
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
            formly.NullableDate = NullableDate;
            var directives;
            (function (directives) {
                var NullableFieldDirective;
                (function (NullableFieldDirective) {
                    NullableFieldDirective.name = "nullableField";
                    function register(m) {
                        m.directive(NullableFieldDirective.name, directive);
                    }
                    NullableFieldDirective.register = register;
                    function directive() {
                        return {
                            controller: Ctrl,
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
                    NullableFieldDirective.directive = directive;
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
                    NullableFieldDirective.Ctrl = Ctrl;
                })(NullableFieldDirective = directives.NullableFieldDirective || (directives.NullableFieldDirective = {}));
                var formBuilder;
                (function (formBuilder) {
                    function register(m) {
                        m.directive("formBuilder", directive);
                    }
                    formBuilder.register = register;
                    function directive() {
                        return {
                            //language=html
                            template: "\n<div class=\"form-builder\">\n    <form name=\"f\" ng-submit=\"Ctrl.onSave()\" promise-btn>\n        <fieldset>\n            <legend>{{Ctrl.title}}</legend>\n            <formly-form fields=\"Ctrl.fields\" model=\"Ctrl.model\"></formly-form>\n            <ng-transclude></ng-transclude>\n            <hr/>\n            <button class=\"btn btn-primary\" ng-disabled=\"!f.$valid\">SALVA</button>\n        </fieldset>\n    </form>\n</div>\n",
                            controller: Ctrl,
                            controllerAs: "Ctrl",
                            transclude: true,
                            replace: true,
                            scope: {
                                model: "=",
                                fields: "=",
                                onSave: "&",
                                title: "=*"
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
                                return this.$scope["title"] || null;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Ctrl.prototype.onSave = function () {
                            return this.$scope["onSave"]();
                        };
                        return Ctrl;
                    }(ngUtils.lib.BaseCtrl));
                })(formBuilder = directives.formBuilder || (directives.formBuilder = {}));
            })(directives = formly.directives || (formly.directives = {}));
            function Configure(m) {
                m.run([
                    "formlyValidationMessages", function (formlyValidationMessages) {
                        formlyValidationMessages.addStringMessage("required", "Campo richiesto");
                        formlyValidationMessages.messages["minlength"] = function ($viewValue, $modelValue, $scope) {
                            return !!$scope["to"].minlength ? "Minimo " + $scope["to"].minlength + " caratteri" : "";
                        };
                    }
                ]);
                m.run([
                    "formlyConfig", function (formlyConfig) {
                        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = "fc.$dirty";
                        formlyConfig.setType({
                            name: "awesome-checkbox",
                            //language=html
                            template: "\n                    <div class=\"checkbox\">\n                        <input type=\"checkbox\" class=\"formly-field-checkbox\" ng-model=\"model[options.key]\" id=\"{{options.id}}\">\n                        <label for=\"{{options.id}}\">\n                            {{to.label}}\n                            {{to.required ? '*' : ''}}\n                        </label>\n\n                    </div>\n                    "
                        });
                        formlyConfig.setWrapper({
                            name: "hasError",
                            types: ["input", "select"],
                            //language=html
                            template: "\n\n\n                    <formly-transclude></formly-transclude>\n               \n                    <div class=\"text-danger\" ng-messages=\"options.formControl.$error\" ng-if=\"options.validation.errorExistsAndShouldBeVisible\" >\n        <div class=\"error-message\" ng-message=\"{{::name}}\" ng-repeat=\"(name, message) in ::options.validation.messages\">\n            {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}\n        </div>\n    </div>\n"
                        });
                        if (ngUtils.moduleExists(m, "ui.bootstrap")) {
                            /// #region datepicker
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
                                template: "\n <p class=\"input-group\">\n        <input  type=\"text\"\n                id=\"{{::id}}\"\n                name=\"{{::id}}\"\n                ng-model=\"model[options.key]\"\n                class=\"form-control\"\n                ng-click=\"datepicker.open($event)\"\n                uib-datepicker-popup=\"{{to.datepickerOptions.format}}\"\n                is-open=\"datepicker.opened\"\n                datepicker-options=\"to.datepickerOptions\" />\n        <span class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"datepicker.open($event)\" ng-disabled=\"to.disabled\">\n                <i class=\"glyphicon glyphicon-calendar\"></i>\n            </button>\n        </span>\n      </p>\n",
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
                            var camelize = function (string) {
                                string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
                                    return chr ? chr.toUpperCase() : "";
                                });
                                // Ensure 1st char is always lowercase
                                return string.replace(/^([A-Z])/, function (match, chr) {
                                    return chr ? chr.toLowerCase() : "";
                                });
                            };
                            /// #endregion
                        }
                    }
                ]);
            }
            formly.Configure = Configure;
        })(formly = ngUtils.formly || (ngUtils.formly = {}));
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
        })(JsonUtils = ngUtils.JsonUtils || (ngUtils.JsonUtils = {}));
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
        })(fileUtils = ngUtils.fileUtils || (ngUtils.fileUtils = {}));
        var faLoading;
        (function (faLoading) {
            function register(m) {
                m.directive(base.directiveName, base.Directive);
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
                        var dirName = base.directiveName + (size || "") + "T" + (spinnerIndex + 1);
                        m.directive(dirName, base.baseTheme.DirectiveBuilder(html));
                    });
                });
            }
            faLoading.register = register;
            var base;
            (function (base) {
                base.directiveName = "faLoading";
                var Ctrl = /** @class */ (function () {
                    function Ctrl() {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        this.args = null;
                        this.args = args;
                    }
                    Object.defineProperty(Ctrl.prototype, "$scope", {
                        get: function () {
                            return this.args[Ctrl.$inject.indexOf("$scope")];
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Ctrl.prototype, "IsLoading", {
                        get: function () {
                            return !!this.$scope["isLoading"];
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Ctrl.$inject = ["$scope"];
                    return Ctrl;
                }());
                base.Ctrl = Ctrl;
                function Directive() {
                    return {
                        transclude: {
                            'content': "content",
                            'loading': "loading"
                        },
                        controller: Ctrl,
                        restrict: "E",
                        controllerAs: "Ctrl",
                        //language=html
                        template: "\n                        <span ng-if=\"Ctrl.IsLoading\" ng-transclude=\"loading\"></span>\n                        <span ng-if=\"!Ctrl.IsLoading\" ng-transclude=\"content\"></span>\n                        ",
                        scope: {
                            isLoading: "="
                        }
                    };
                }
                base.Directive = Directive;
                var baseTheme;
                (function (baseTheme) {
                    function DirectiveBuilder(loadingTemplate) {
                        return function () {
                            console.log(loadingTemplate);
                            var originalDirective = base.Directive();
                            originalDirective.transclude = true;
                            //language=html
                            originalDirective.template = "\n                <fa-loading is-loading=\"Ctrl.IsLoading\">\n                    <loading>" + loadingTemplate + "</loading>\n                    <content ng-transclude>\n                     \n                    </content>\n                </fa-loading>\n";
                            return originalDirective;
                        };
                    }
                    baseTheme.DirectiveBuilder = DirectiveBuilder;
                })(baseTheme = base.baseTheme || (base.baseTheme = {}));
            })(base = faLoading.base || (faLoading.base = {}));
        })(faLoading = ngUtils.faLoading || (ngUtils.faLoading = {}));
        var promiseButton;
        (function (promiseButton) {
            function Configure(module) {
                module.config([
                    "angularPromiseButtonsProvider", function (angularPromiseButtonsProvider) {
                        angularPromiseButtonsProvider.extendConfig({
                            //language=html
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
            promiseButton.Configure = Configure;
        })(promiseButton = ngUtils.promiseButton || (ngUtils.promiseButton = {}));
    })(ngUtils = exports.ngUtils || (exports.ngUtils = {}));
});
//# sourceMappingURL=ng-utils.js.map