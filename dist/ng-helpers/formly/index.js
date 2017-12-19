define(["require", "exports", "./datepicker", "./form-builder", "./nullable-field-directive/index", "./nullable-date"], function (require, exports, dpConfig, formBuilder, nfd, nullable_date_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Configure(m) {
        m.run([
            "formlyValidationMessages",
            (formlyValidationMessages) => {
                formlyValidationMessages.addStringMessage("required", "Campo richiesto");
                formlyValidationMessages.messages["minlength"] = ($viewValue, $modelValue, $scope) => {
                    return !!$scope["to"].minlength
                        ? `Minimo ${$scope["to"].minlength} caratteri`
                        : "";
                };
            }
        ]);
        m.run([
            "formlyConfig",
            (formlyConfig) => {
                formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = "fc.$dirty";
                formlyConfig.setType({
                    name: "awesome-checkbox",
                    //language=html
                    template: `
            <div class="checkbox">
                <input type="checkbox" class="formly-field-checkbox" ng-model="model[options.key]" id="{{options.id}}">
                <label for="{{options.id}}">
                    {{to.label}}
                    {{to.required ? '*' : ''}}
                </label>
            </div>
            `
                });
                formlyConfig.setWrapper({
                    name: "hasError",
                    types: ["input", "select"],
                    //language=html
                    template: `
            <formly-transclude></formly-transclude>
    
            <div class="text-danger" ng-messages="options.formControl.$error" ng-if="options.validation.errorExistsAndShouldBeVisible" >
    <div class="error-message" ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">
    {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}
    </div>
    </div>
    `
                });
            }
        ]);
        dpConfig.Configure(m);
        formBuilder.register(m);
        nfd.register(m);
    }
    exports.Configure = Configure;
    exports.NullableDate = nullable_date_1.NullableDate;
});
//# sourceMappingURL=index.js.map