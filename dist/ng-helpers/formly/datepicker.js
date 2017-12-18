define(["require", "exports", "../module-exists", "angular"], function (require, exports, moduleExists, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    var camelize = function (string) {
                        string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
                            return chr ? chr.toUpperCase() : "";
                        });
                        // Ensure 1st char is always lowercase
                        return string.replace(/^([A-Z])/, function (match, chr) {
                            return chr ? chr.toLowerCase() : "";
                        });
                    };
                }]);
        });
    }
    exports.Configure = Configure;
});
//# sourceMappingURL=datepicker.js.map