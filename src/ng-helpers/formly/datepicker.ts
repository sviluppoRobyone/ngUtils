import * as moduleExists from "../module-exists";
import * as angular from "angular";

function camelize(s)  {
    s = s.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : "";
    });
    // Ensure 1st char is always lowercase
    return s.replace(/^([A-Z])/, function (match, chr) {
        return chr ? chr.toLowerCase() : "";
    });
}

export function Configure(app:ng.IModule){



    moduleExists.configureModuleIfExists(app,["ui.bootstrap"],()=>{
        app.run([            "formlyConfig", (formlyConfig: AngularFormly.IFormlyConfig) => {
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
                template: `
    <p class="input-group">
    <input  type="text"
    id="{{::id}}"
    name="{{::id}}"
    ng-model="model[options.key]"
    class="form-control"
    ng-click="datepicker.open($event)"
    uib-datepicker-popup="{{to.datepickerOptions.format}}"
    is-open="datepicker.opened"
    datepicker-options="to.datepickerOptions" />
    <span class="input-group-btn">
    <button type="button" class="btn btn-default" ng-click="datepicker.open($event)" ng-disabled="to.disabled">
    <i class="glyphicon glyphicon-calendar"></i>
    </button>
    </span>
    </p>
    `,
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