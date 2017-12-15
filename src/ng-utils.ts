import * as angular from "angular";
import * as $ from "jquery";
import * as ngHelpers from "./ng-helpers/index";
export module ngUtils {

   export var ng=ngHelpers;

    
   
   

    function configureModule(m: ng.IModule, moduleName: string, fn: Function) {

        if (moduleExists(m, moduleName)) {
            try {
                fn();

            } catch (e) {
                console.error("NgUtils: error configuring module " + moduleName);
                console.error(e);
            }
        } else {
            console.info("NgUtils: module configuration " + moduleName + " skipped");
        }
    }

   
    export module HttpErrorToModal {
        //required module ui.bootstrap
        export function register(m: ng.IModule) {

            var factoryName = "HttpErrorToModalFactory";
            m.config(["$httpProvider",
                ($httpProvider: ng.IHttpProvider) => {
                    $httpProvider.interceptors.push(factoryName);
                }
            ]);
            const arr = ([] as any[]).concat(Interceptor.$inject as any[]);
            arr.push((...args:any[]) => {

                return new Interceptor(...args);
            });
            m.factory(factoryName, arr);

        }

        class ModalController {
            static $inject: string[] = ["errors", "$injector"];

            get Errors() {
                return this.args[ModalController.$inject.indexOf("errors")];
            }
            args: any = [];
            constructor(...args:any[]) {
                this.args = args;
            }
        }
        class Interceptor implements ng.IHttpInterceptor {

            static $inject: string[] = ["$q", "$injector"];
            private readonly args: any[] = [];
            private errorList: any[] = [];
            get $injector(): ng.auto.IInjectorService {
                return this.args[Interceptor.$inject.indexOf("$injector")];
            }
            private get $q(): ng.IQService {
                return this.args[Interceptor.$inject.indexOf("$q")];
            }
            private get $uibModal(): angular.ui.bootstrap.IModalService {
                return this.$injector.get<angular.ui.bootstrap.IModalService>("$uibModal");
            }

            constructor(...args:any[]) {
                this.args = args;
            }

            private $modal: angular.ui.bootstrap.IModalServiceInstance = null;


            public responseError = (rejection:any) => {

                try {
                    rejection["json"] = JSON.parse(rejection.data);

                    if (rejection["json"]["Response"]) {
                        rejection["json"] = JSON.parse(rejection["json"]["Response"]);
                    }
                } catch (e) {
                    rejection["json"] = null;
                }



                this.errorList.push(rejection);

                if (!this.$modal) {
                    this.$modal = this.$uibModal.open({
                        controllerAs: "Ctrl",
                        resolve: {
                            errors: () => {
                                return this.errorList;
                            }
                        },
                        controller: ModalController,

                        //language=html
                        template: `

                    <div class="modal-header">
                        <h4 class="modal-title" >
                            Si è verificato un errore
                        </h3>
                    </div>
                    <div class="modal-body">
                        
                        <div ng-repeat="e in Ctrl.Errors" class="well well-sm" >
                        
                            <p>
                                <small ng-if="e.status">{{e.status}}</small>
                                <small ng-if="e.statusText">{{e.statusText}}</small>
                                <code  ng-if="e.config.url">{{e.config.url}}</code>
                          
                            </p>

                            <div ng-if="e.json">
                                <p class="lead" ng-if="e.json.Message">Messaggio: <em>{{e.json.Message}}</em></p>
                                <div ng-if="e.json.ModelState">
                                    <dl ng-repeat="(key,errs) in e.json.ModelState">
                                        <dt>{{key}}</dt>
                                        <dd>
                                                <ul class="list-unstyled" style="margin:0">
                                                <li ng-repeat="s in errs">{{s}}</li>            
                                    </ul>
                                        </dd>
                                    </dl> 
                                </div>
                            </div>
                        </div>
                    </div>
                    
`

                    });
                }
                return this.$q.reject(rejection);
            }

        }
    }
    export module formly {



        export function NullableDate(key: string, label: string): AngularFormly.IFieldArray {
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
                        "templateOptions.disabled": ($viewValue, $modelValue, scope) => {
                            return !!scope.model[`Not${key}`];
                        },
                        "templateOptions.required": ($viewValue, $modelValue, scope) => {
                            return !scope.model[`Not${key}`];
                        }
                    }

                },
                {
                    key: `Not${key}`,
                    type: "awesome-checkbox",

                    templateOptions: {
                        label: `Senza ${label}`,
                        onChange: ($viewValue, $modelValue, scope) => {

                            if ($viewValue || $modelValue)
                                scope.model[key] = null;
                        }
                    }


                }
            ];
        }
        export module directives {
            export module NullableFieldDirective {

                export const name = "nullableField";
                export function register(m: ng.IModule) {
                    m.directive(name, directive);
                }
                export function directive() {
                    return {
                        controller: Ctrl,
                        controllerAs: "Ctrl",
                        restrict: "E",
                        //language=html
                        template: `<formly-form model="Ctrl.formModel" fields="Ctrl.fields"></formly-form>`,
                        scope: {
                            model: "=",
                            type: "@",
                            label: "@"
                        }
                    } as ng.IDirective;
                }
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
            }

            export module formBuilder {
                export function register(m: ng.IModule) {
                    m.directive("formBuilder", directive);
                }
                function directive(): ng.IDirective {
                    return {
                        //language=html
                        template: `
<div class="form-builder">
    <form name="f" ng-submit="Ctrl.onSave()" promise-btn>
        <fieldset>
            <legend>{{Ctrl.title}}</legend>
            <formly-form fields="Ctrl.fields" model="Ctrl.model"></formly-form>
            <ng-transclude></ng-transclude>
            <hr/>
            <button class="btn btn-primary" ng-disabled="!f.$valid">SALVA</button>
        </fieldset>
    </form>
</div>
`,
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

                class Ctrl extends ngUtils.lib.BaseCtrl {

                    get model() {
                        return this.$scope["model"];
                    }
                    set model(v) {
                        this.$scope["model"] = v;
                    }

                    get fields() {
                        return this.$scope["fields"];
                    }

                    set fields(v) {
                        this.$scope["fields"] = v;
                    }

                    get title() {
                        return this.$scope["title"] || null;
                    }
                    onSave() {
                        return this.$scope["onSave"]();
                    }
                }
            }
        }
        export function Configure(m: ng.IModule) {

            m.run([
                "formlyValidationMessages", (formlyValidationMessages: AngularFormly.IValidationMessages) => {

                    formlyValidationMessages.addStringMessage("required", "Campo richiesto");

                    formlyValidationMessages.messages["minlength"] = ($viewValue, $modelValue, $scope) => {
                        return !!$scope["to"].minlength ? `Minimo ${$scope["to"].minlength} caratteri` : "";
                    };
                }
            ]);
            m.run([
                "formlyConfig", (formlyConfig: AngularFormly.IFormlyConfig) => {


                    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = "fc.$dirty";

                    formlyConfig.setType({
                        name: "awesome-checkbox",
                        //language=html
                        template:
                        `
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

                        var camelize = (string) => {
                            string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
                                return chr ? chr.toUpperCase() : "";
                            });
                            // Ensure 1st char is always lowercase
                            return string.replace(/^([A-Z])/, function (match, chr) {
                                return chr ? chr.toLowerCase() : "";
                            });
                        }

                        /// #endregion
                    }



                }]);
        }

    }

    export module JsonUtils {
        export function DateReviver(key: string, value: any): any {

            var regexs = [

                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\Z$/

            ];
            if (typeof value === "string" && regexs.some(x => x.test(value))) {
                return new Date(value);
            }
            return value;
        }
    }
    export module fileUtils {
        //http://wiki.lenux.org/base64-string-to-blob-object/
        export function base64StringToBlob(base64encodedString: string): Blob {

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
    }
    export module faLoading {

        export function register(m: ng.IModule) {
            m.directive(base.directiveName, base.Directive);

            var spinners = ["circle-o-notch", "cog", "gear", "refresh", "spinner"];

            var sizes = [null, "lg", "2x", "3x", "4x", "5x"];

            var baseTmpl = $("<div/>");
            baseTmpl.addClass("text-center");

            $("<i/>")
                .addClass("fa fa-spin")
                .appendTo(baseTmpl);


            spinners.forEach((spinner, spinnerIndex) => {
                sizes.forEach(size => {

                    var div = baseTmpl.clone();
                    var i = $(".fa", div);
                    i.addClass(`fa-${spinner}`);

                    if (size)
                        i.addClass(`fa-${size}`);

                    var html = $("<div/>").append(div).html();
                    var dirName = base.directiveName + (size || "") + "T" + (spinnerIndex + 1);
                    m.directive(dirName, base.baseTheme.DirectiveBuilder(html));
                });

            });

        }

        export module base {
            export var directiveName = "faLoading";

            export class Ctrl {
                static $inject = ["$scope"];
                private args: any[] = null;

                constructor(...args) {
                    this.args = args;
                }

                get $scope(): ng.IScope {
                    return this.args[Ctrl.$inject.indexOf("$scope")];
                }

                get IsLoading(): boolean {
                    return !!this.$scope["isLoading"];
                }
            }

            export function Directive() {
                return {
                    transclude: {
                        'content': "content",
                        'loading': "loading"
                    },
                    controller: Ctrl,
                    restrict: "E",
                    controllerAs: "Ctrl",

                    //language=html
                    template: `
                        <span ng-if="Ctrl.IsLoading" ng-transclude="loading"></span>
                        <span ng-if="!Ctrl.IsLoading" ng-transclude="content"></span>
                        `,

                    scope: {
                        isLoading: "="
                    }

                } as ng.IDirective;
            }

            export module baseTheme {

                export function DirectiveBuilder(loadingTemplate: string) {

                    return () => {
                        console.log(loadingTemplate);
                        var originalDirective = base.Directive();

                        originalDirective.transclude = true;
                        //language=html
                        originalDirective.template = `
                <fa-loading is-loading="Ctrl.IsLoading">
                    <loading>${loadingTemplate}</loading>
                    <content ng-transclude>
                     
                    </content>
                </fa-loading>
`;
                        return originalDirective;
                    }

                }
            }


        }
    }

    export module promiseButton {
        export function Configure(module: ng.IModule) {
            module.config([
                "angularPromiseButtonsProvider", (angularPromiseButtonsProvider) => {
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
    }


}

function newFunction() {
    export { ngHelpers };
}

