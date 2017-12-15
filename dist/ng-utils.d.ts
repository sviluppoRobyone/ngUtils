/// <reference types="angular" />
/// <reference types="angular-route" />
/// <reference types="angular-formly" />
import * as angular from "angular";
export declare module ngUtils {
    function moduleExists(m: ng.IModule, name: string): boolean;
    class ngUtilsService {
        private args;
        static serviceName: string;
        static $inject: string[];
        private store;
        constructor(...args: any[]);
        protected getFromInject<T>(key: string): any;
        readonly $injector: angular.auto.IInjectorService;
        readonly $rootScope: ng.IRootScopeService;
        readonly $http: ng.IHttpService;
        readonly $location: ng.ILocationService;
        readonly $routeParams: ng.route.IRouteParamsService;
        readonly $q: ng.IQService;
        readonly $filter: ng.IFilterService;
        readonly $route: ng.route.IRouteService;
        readonly $timeout: ng.ITimeoutService;
        readonly $ngView: JQuery;
        readonly $cacheFactory: ng.ICacheFactoryService;
        readonly $locale: ng.ILocaleService;
        readonly $interval: ng.IIntervalService;
        readonly $log: ng.ILogService;
        readonly $sce: ng.ISCEService;
        manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function): angular.IPromise<{}>;
        onScopeDispose($scope: ng.IScope): angular.IPromise<{}>;
    }
    module lib {
        class BaseCtrl {
            static $inject: string[];
            args: any[];
            constructor(...args: any[]);
            readonly $scope: ng.IScope;
            readonly $ngUtils: ngUtilsService;
            readonly $q: angular.IQService;
        }
    }
    function Init(m: ng.IModule): void;
    module filters {
        function AllFilters(m: ng.IModule): void;
        function html(m: ng.IModule): void;
        function url(m: ng.IModule): void;
        function bytes(m: ng.IModule): void;
    }
    module HttpErrorToModal {
        function register(m: ng.IModule): void;
    }
    module formly {
        function NullableDate(key: string, label: string): AngularFormly.IFieldArray;
        module directives {
            module NullableFieldDirective {
                const name = "nullableField";
                function register(m: ng.IModule): void;
                function directive(): angular.IDirective<angular.IScope>;
                class Ctrl {
                    static $inject: string[];
                    private args;
                    fields: AngularFormly.IFieldArray;
                    constructor(...args: any[]);
                    readonly $scope: ng.IScope;
                    $model: any;
                    readonly $type: any;
                    readonly $label: any;
                    formModel: {
                        isNull: boolean;
                        model: any;
                    };
                }
            }
            module formBuilder {
                function register(m: ng.IModule): void;
            }
        }
        function Configure(m: ng.IModule): void;
    }
    module JsonUtils {
        function DateReviver(key: string, value: any): any;
    }
    module fileUtils {
        function base64StringToBlob(base64encodedString: string): Blob;
    }
    module faLoading {
        function register(m: ng.IModule): void;
        module base {
            var directiveName: string;
            class Ctrl {
                static $inject: string[];
                private args;
                constructor(...args: any[]);
                readonly $scope: ng.IScope;
                readonly IsLoading: boolean;
            }
            function Directive(): angular.IDirective<angular.IScope>;
            module baseTheme {
                function DirectiveBuilder(loadingTemplate: string): () => angular.IDirective<angular.IScope>;
            }
        }
    }
    module promiseButton {
        function Configure(module: ng.IModule): void;
    }
}
