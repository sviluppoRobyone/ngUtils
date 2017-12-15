import * as dpConfig from "./datepicker";
import * as formBuilder from "./form-builder";
import * as nfd from "./nullable-field-directive/index";


export function Configure(m: ng.IModule) {
  m.run([
    "formlyValidationMessages",
    (formlyValidationMessages: AngularFormly.IValidationMessages) => {
      formlyValidationMessages.addStringMessage("required", "Campo richiesto");

      formlyValidationMessages.messages["minlength"] = (
        $viewValue,
        $modelValue,
        $scope
      ) => {
        return !!$scope["to"].minlength
          ? `Minimo ${$scope["to"].minlength} caratteri`
          : "";
      };
    }
  ]);

  m.run([
    "formlyConfig",
    (formlyConfig: AngularFormly.IFormlyConfig) => {
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
export {NullableDate} from "./nullable-date";
