/// <reference types="angular" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-router" />
/// <reference types="angular-ui-bootstrap" />
/// <reference types="angular-formly" />
declare module "ng-utils";declare module "file-helpers/index" {
    export function base64ToBlob(base64encodedString: string, myme: string): Blob;
    export function blobToBase64(blob: Blob, cb: {
        (base64String: string): void;
    }): void;
    export function download(fileName: string, blob: Blob): void;
}
declare module "json-helpers/index" {
    export module JsonUtils {
        function DateReviver(key: string, value: any): any;
    }
}
declare module "ng-helpers/utils/base-injectable" {
    import * as angular from "angular";
    export default abstract class BaseInjectable {
        static $inject: string[];
        private _store;
        private _args;
        protected getFromInjector<T>(key: string): T;
        constructor(...args: any[]);
        protected readonly $injector: ng.auto.IInjectorService;
        protected readonly $injectedArgs: any[];
        protected readonly $rootScope: angular.IRootScopeService;
        protected readonly $http: angular.IHttpService;
        protected readonly $location: angular.ILocationService;
        protected readonly $q: angular.IQService;
        protected readonly $filter: angular.IFilterService;
        protected readonly $timeout: angular.ITimeoutService;
        protected readonly $cacheFactory: angular.ICacheFactoryService;
        protected readonly $locale: angular.ILocaleService;
        protected readonly $interval: angular.IIntervalService;
        protected readonly $log: angular.ILogService;
        protected readonly $sce: angular.ISCEService;
        protected readonly $Upload: angular.angularFileUpload.IUploadService;
        protected readonly $stateParams: angular.ui.IStateParamsService;
        protected readonly $state: angular.ui.IStateService;
        protected readonly $uibModal: angular.ui.bootstrap.IModalService;
    }
}
declare module "ng-helpers/utils/name-generator" {
    export function GetServiceName(name: any): string;
    export function GetDirectiveName(name: any): any;
}
declare module "ng-helpers/debug/debug-service" {
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export default function register(m: ng.IModule): void;
    export var serviceName: string;
    export interface IDebugDetectorFunction {
        (): ng.IPromise<boolean>;
    }
    export module Detectors {
        const DebugName = "DEBUG";
        function IsLocalhost(): boolean;
        function IsLocalDomain(): boolean;
        function IsWindowDebugDefined(): boolean;
        function GetWindowDebugValue(): any;
        function IsDebugEnabled(): any;
    }
    export class Service extends BaseInjectable {
        DebugStatus: boolean;
        private Updater;
        constructor(...args: any[]);
        private UpdateStatus();
        private init();
        SetDebugUpdater(f: IDebugDetectorFunction): void;
        readonly updateDebugV1: any;
    }
}
declare module "ng-helpers/core" {
    import * as angular from "angular";
    export interface IDirectiveFn {
        (): ng.IDirective;
    }
    export function registerDirective(m: ng.IModule, directiveName: string, directive: IDirectiveFn): void;
    export function registerService(m: ng.IModule, serviceName: string, service: ng.Injectable<Function>): void;
    export module ConsoleUtils {
        function GetLogger(): angular.ILogService;
    }
}
declare module "ng-helpers/file-viewer" {
    import * as angular from "angular";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export const serviceName = "fileViewer";
    export default function register(m: ng.IModule): void;
    export class fileViewerService extends BaseInjectable {
        readonly $uibModal: angular.ui.bootstrap.IModalService;
        viewFile(file: File): angular.ui.bootstrap.IModalInstanceService;
    }
}
declare module "ng-helpers/service" {
    import * as angular from "angular";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    import * as fv from "ng-helpers/file-viewer";
    import * as debugService from "ng-helpers/debug/debug-service";
    export var serviceName: string;
    import * as AsyncLoader from "ng-helpers/async-loader";
    export default function register(m: ng.IModule): void;
    export class Service extends BaseInjectable {
        static $inject: string[];
        readonly $rootScope: angular.IRootScopeService;
        readonly $http: angular.IHttpService;
        readonly $location: angular.ILocationService;
        readonly $q: angular.IQService;
        readonly $filter: angular.IFilterService;
        readonly $timeout: angular.ITimeoutService;
        readonly $cacheFactory: angular.ICacheFactoryService;
        readonly $locale: angular.ILocaleService;
        readonly $interval: angular.IIntervalService;
        readonly $log: angular.ILogService;
        readonly $sce: angular.ISCEService;
        readonly $Upload: angular.angularFileUpload.IUploadService;
        readonly $stateParams: angular.ui.IStateParamsService;
        readonly $state: angular.ui.IStateService;
        readonly $uibModal: angular.ui.bootstrap.IModalService;
        readonly $debugService: debugService.Service;
        readonly $fileViewer: fv.fileViewerService;
        readonly $asyncLoader: AsyncLoader.Service;
        manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function): angular.IPromise<{}>;
        onScopeDispose($scope: ng.IScope): angular.IPromise<{}>;
    }
}
declare module "ng-helpers/async-loader" {
    import * as angular from "angular";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export var serviceName: string;
    export default function register(m: ng.IModule): void;
    export interface IGetDataFunction<T> {
        (resolve: ng.IQResolveReject<T>, reject: ng.IQResolveReject<any>): void;
    }
    export interface IAsyncLoaderConstructor<T> {
        $q: ng.IQService;
        $timeout: ng.ITimeoutService;
    }
    export class Config<T> {
        isLoading: boolean;
        isSuccess: boolean;
        isFailed: boolean;
        successCount: number;
        GetDataFn: IGetDataFunction<T>;
        Fn: IGetDataFunction<T>;
    }
    export class AsyncLoader<T> extends BaseInjectable {
        static BuildFactoryFn(): any[];
        private internalData;
        private config;
        readonly IsLoading: boolean;
        readonly IsSuccess: boolean;
        readonly IsFailed: boolean;
        readonly Data: T;
        SetDataFunction(fn: IGetDataFunction<T>): void;
        constructor(...args: any[]);
        Update(): angular.IPromise<{}>;
    }
    export class Service extends BaseInjectable {
        protected readonly $q: angular.IQService;
        protected readonly $timeout: angular.ITimeoutService;
        Create<T>(f: IGetDataFunction<T>): AsyncLoader<T>;
    }
}
declare module "ng-helpers/filters/index" {
    export function html(m: ng.IModule): void;
    export function url(m: ng.IModule): void;
    export function bytes(m: ng.IModule): void;
    export default function RegisterAllFilters(m: ng.IModule): void;
}
declare module "ng-helpers/utils/module-exists" {
    export function moduleExists(m: ng.IModule, names: string[]): boolean;
    export function configureModuleIfExists(m: ng.IModule, moduleNames: string[], fn: Function): void;
}
declare module "ng-helpers/fa-loading/themes" {
    import * as angular from "angular";
    export namespace baseTheme {
        function DirectiveBuilder(loadingTemplate: string): () => angular.IDirective<angular.IScope>;
    }
}
declare module "ng-helpers/utils/base-ctrl" {
    import * as angular from "angular";
    import * as ngUtils from "ng-helpers/service";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export default abstract class BaseCtrl extends BaseInjectable implements ng.IController {
        static $inject: string[];
        protected readonly $scope: angular.IScope;
        protected readonly $ngUtils: ngUtils.Service;
    }
}
declare module "ng-helpers/fa-loading/ctrl" {
    import BaseCtrl from "ng-helpers/utils/base-ctrl";
    export class Ctrl extends BaseCtrl {
        readonly IsLoading: boolean;
    }
}
declare module "ng-helpers/fa-loading/directive" {
    import * as angular from "angular";
    export var directiveName: any;
    export function directive(): angular.IDirective<angular.IScope>;
}
declare module "ng-helpers/fa-loading/index" {
    export default function register(m: ng.IModule): void;
}
declare module "ng-helpers/promise-buttons/index" {
    export default function Configure(m: ng.IModule): void;
}
declare module "ng-helpers/http-error-to-modal/modal-ctrl" {
    import BaseCtrl from "ng-helpers/utils/base-ctrl";
    export var ErrorKey: string;
    export class Ctrl extends BaseCtrl {
        static $inject: string[];
        readonly Errors: any;
    }
}
declare module "ng-helpers/http-error-to-modal/interceptor" {
    import * as angular from "angular";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export class Interceptor extends BaseInjectable implements ng.IHttpInterceptor {
        private errorList;
        private $modal;
        responseError: (rejection: any) => angular.IPromise<never>;
    }
}
declare module "ng-helpers/http-error-to-modal/index" {
    export default function register(m: ng.IModule): void;
}
declare module "ng-helpers/debug/debug-modal" {
    export default function register(m: ng.IModule): void;
}
declare module "ng-helpers/formly/datepicker" {
    export function Configure(app: ng.IModule): void;
}
declare module "ng-helpers/utils/base-ctrl-for-directive" {
    import BaseCtrl from "ng-helpers/utils/base-ctrl";
    export default abstract class BaseCtrlForDirective extends BaseCtrl {
        static $inject: string[];
        protected readonly $attrs: ng.IAttributes;
    }
}
declare module "ng-helpers/formly/form-builder" {
    export default function register(m: ng.IModule): void;
}
declare module "ng-helpers/formly/nullable-field-directive/ctrl" {
    export class Ctrl {
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
declare module "ng-helpers/formly/nullable-field-directive/directive" {
    import * as angular from "angular";
    export var name: string;
    export function directive(): angular.IDirective<angular.IScope>;
}
declare module "ng-helpers/formly/nullable-field-directive/index" {
    export function register(m: ng.IModule): void;
}
declare module "ng-helpers/formly/index" {
    export default function Configure(m: ng.IModule): void;
}
declare module "polyfill/string-polyfill" {
    export default function run(): void;
    global  {
        interface String {
            endsWith(search: string, len?: number): boolean;
        }
    }
}
declare module "polyfill/array-polyfill" {
    export default function run(): void;
    global  {
        interface Array<T> {
            find(predicate: (search: T) => boolean): T;
        }
    }
}
declare module "polyfill/index" {
    export default function run(): void;
}
declare module "ng-helpers/init" {
    export default function init(m: ng.IModule): void;
}
declare module "ng-helpers/formly/nullable-date" {
    export default function NullableDate(key: string, label: string): AngularFormly.IFieldArray;
}
declare module "ng-helpers/utils/base-service" {
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    import * as ngUtilsService from "ng-helpers/service";
    export default abstract class BaseService extends BaseInjectable {
        static $inject: string[];
        protected readonly $ngUtils: ngUtilsService.Service;
    }
}
declare module "random-helpers/string" {
    export function randomStringV1(length: number): string;
}
