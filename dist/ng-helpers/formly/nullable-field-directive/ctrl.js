define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ctrl {
        constructor(...args) {
            this.args = [];
            this.fields = [
                {
                    key: "model",
                    type: "input",
                    templateOptions: {
                        label: "",
                        type: "" //settato dopo
                    }, expressionProperties: {
                        "templateOptions.disabled": ($viewValue, $modelValue, scope) => {
                            return !!scope.model["isNull"];
                        },
                        "templateOptions.required": ($viewValue, $modelValue, scope) => {
                            return !scope.model["isNull"];
                        }
                    }
                },
                {
                    key: "isNull",
                    type: "awesome-checkbox",
                    templateOptions: {
                        label: "Non impostato",
                        onChange: ($viewValue, $modelValue, scope) => {
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
                get() {
                    return c.$model;
                },
                set(v) {
                    c.$model = v;
                }
            });
            this.formModel.isNull = this.$model == null;
        }
        get $scope() {
            return this.args[Ctrl.$inject.indexOf("$scope")];
        }
        get $model() {
            return this.$scope["model"];
        }
        set $model(v) {
            this.$scope["model"] = v;
        }
        get $type() {
            return this.$scope["type"] || "text";
        }
        get $label() {
            return this.$scope["label"] || "";
        }
    }
    Ctrl.$inject = ["$scope"];
    exports.Ctrl = Ctrl;
});
//# sourceMappingURL=ctrl.js.map