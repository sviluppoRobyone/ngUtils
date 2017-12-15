export class Ctrl {
    
                        static $inject = ["$scope"];
    
                        private args = [];
                        public fields: AngularFormly.IFieldArray = [
                            {
                                key: "model",
                                type: "input",
                                templateOptions: {
                                    label: "",//settato dopo
                                    type: ""//settato dopo
                                }, expressionProperties: {
                                    "templateOptions.disabled": ($viewValue, $modelValue, scope) => {
                                        return !!scope.model["isNull"];
                                    },
                                    "templateOptions.required": ($viewValue, $modelValue, scope) => {
                                        return !scope.model["isNull"];
                                    }
                                }
    
                            }
                            ,
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
                        constructor(...args) {
                            this.args = args;
    
                            this.fields[0].templateOptions.type = this.$type;
                            this.fields[0].templateOptions.label = this.$label;
                            delete this.formModel.model;
                            var c = this;
                            Object.defineProperty(this.formModel,
                                "model",
                                {
                                    get() {
                                        return c.$model;
                                    },
                                    set(v) {
                                        c.$model = v;
                                    }
    
                                });
    
                            this.formModel.isNull = this.$model == null;
                        }
    
                        get $scope(): ng.IScope {
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
                        formModel = {
                            isNull: false,
                            model: null
                        }
                    }
    