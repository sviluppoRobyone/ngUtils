define(["require", "exports", "./datepicker", "./form-builder"], function (require, exports, dpConfig, formBuilder) {
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
    }
    exports.Configure = Configure;
});
//# sourceMappingURL=index.js.map