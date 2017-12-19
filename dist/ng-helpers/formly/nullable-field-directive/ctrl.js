define(["require", "exports"], function (require, exports) {
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
//# sourceMappingURL=ctrl.js.map