/// <reference types="angular" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-router" />
/// <reference types="angular-ui-bootstrap" />
/// <reference types="angular-formly" />
declare module "ng-utils";declare module "js-helpers/debug-detectors" {
    export const DebugName = "DEBUG";
    export function IsLocalhost(): boolean;
    export function IsLocalDomain(): boolean;
    export function IsWindowDebugDefined(): boolean;
    export function GetWindowDebugValue(): any;
    export function IsDebugEnabled(): any;
    export var status: {
        readonly IsLocalhost: boolean;
        readonly IsLocalDomain: boolean;
        readonly IsWindowDebugDefined: boolean;
        readonly GetWindowDebugValue: any;
        readonly IsDebugEnabled: any;
    };
}
declare module "js-helpers/file-helpers" {
    export function base64ToBlob(base64encodedString: string, myme: string): Blob;
    export function blobToBase64(blob: Blob, cb: {
        (base64String: string): void;
    }): void;
    export function download(fileName: string, blob: Blob): void;
}
declare module "js-helpers/json-helpers" {
    export module JsonUtils {
        function DateReviver(key: string, value: any): any;
    }
}
declare module "js-helpers/obj-helpers" {
    export default abstract class BaseObj {
        _objInfo: ObjInfo;
        constructor();
    }
    export class ObjInfo {
        private GetFn;
        private readonly Obj;
        constructor(GetObj: {
            (): any;
        });
        readonly ObjConstructor: any;
        readonly ClassName: any;
    }
}
declare module "js-helpers/random-string" {
    export function randomStringV1(length: number): string;
}
declare module "js-helpers/string-helpers" {
    export function capitalize(s: string): string;
}
declare module "ng-helpers/log" {
    import * as angular from "angular";
    export default function configure(m: ng.IModule): void;
    export function GetLogger(): angular.ILogService;
}
declare module "ng-helpers/utils/base-injectable" {
    import * as angular from "angular";
    import BaseObj from "js-helpers/obj-helpers";
    export default abstract class BaseInjectable extends BaseObj {
        static $inject: string[];
        protected readonly _self$inject: string[];
        protected GetInjected<T>(name: string): any;
        private _store;
        private _args;
        protected getFromInjector<T>(key: string): T;
        private checkInit();
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
declare module "ng-helpers/core" {
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    import BaseObj from "js-helpers/obj-helpers";
    export interface IDirectiveFn {
        (): ng.IDirective;
    }
    export function registerDirective(m: ng.IModule, directiveName: string, directive: IDirectiveFn): void;
    export function registerService<T extends BaseInjectable | BaseObj | any>(m: ng.IModule, serviceName: string, service: T): void;
    export function ConcatenaInject(...arrays: any[]): any[];
}
declare module "ng-helpers/file-viewer" {
    import * as angular from "angular";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export const serviceName = "fileViewer";
    export default function register(m: ng.IModule): void;
    export interface fileViewerConfig {
        Blob: Blob;
        Title: string;
        FileName: string;
        MimeType: string;
    }
    export class fileViewerService extends BaseInjectable {
        viewFile(config: fileViewerConfig): angular.ui.bootstrap.IModalInstanceService;
    }
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
            clearAndSet(arr: T[]): T[];
            clear(): T[];
            describe(): T[];
        }
    }
}
declare module "polyfill/index" {
    export default function run(): void;
}
declare module "ng-helpers/utils/name-generator" {
    export function GetServiceName(name: string): string;
    export function GetDirectiveName(name: string): string;
}
declare module "ng-helpers/events" {
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export var serviceName: string;
    export function register(m: ng.IModule): void;
    export interface IEventFunction {
        (event: ng.IAngularEvent, ...args: any[]): void;
    }
    export class EventsService extends BaseInjectable {
        emit(e: string): void;
        on(e: string, f: IEventFunction): void;
    }
}
declare module "ng-helpers/service" {
    import * as angular from "angular";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    import * as fv from "ng-helpers/file-viewer";
    import * as AsyncLoader from "ng-helpers/async-loader";
    import * as events from "ng-helpers/events";
    export const serviceName: string;
    export default function register(m: ng.IModule): void;
    export class NgUtilsService extends BaseInjectable {
        static $inject: any[];
        readonly $events: events.EventsService;
        readonly $fileViewer: fv.fileViewerService;
        readonly $asyncLoader: AsyncLoader.AsyncLoaderService;
        manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function): angular.IPromise<{}>;
        onScopeDispose($scope: ng.IScope): angular.IPromise<{}>;
    }
}
declare module "ng-helpers/utils/base-ctrl" {
    import * as angular from "angular";
    import * as ngUtils from "ng-helpers/service";
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export default abstract class BaseCtrl extends BaseInjectable implements ng.IController {
        static $inject: string[];
        protected readonly $scope: angular.IScope;
        protected readonly $ngUtils: ngUtils.NgUtilsService;
        $onInit(): void;
        $onDestroy(): void;
    }
}
declare module "ng-helpers/utils/base-ctrl-for-directive" {
    import BaseCtrl from "ng-helpers/utils/base-ctrl";
    export default abstract class BaseCtrlForDirective extends BaseCtrl {
        static $inject: string[];
        protected readonly $attrs: ng.IAttributes;
        protected readonly $element: JQuery;
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
    export class Config<T> {
        isLoading: boolean;
        isSuccess: boolean;
        isFailed: boolean;
        dafaultValue: T;
        successCount: number;
        GetDataFn: IGetDataFunction<T>;
    }
    export class AsyncLoader<T> extends BaseInjectable {
        private internalData;
        private config;
        readonly IsLoading: boolean;
        readonly IsSuccess: boolean;
        readonly IsFailed: boolean;
        readonly Data: T;
        SetDataFunction(fn: IGetDataFunction<T>, defaultValue?: T): void;
        constructor(...args: any[]);
        private assignValue(data);
        Update(): angular.IPromise<{}>;
    }
    export class AsyncLoaderService extends BaseInjectable {
        Create<T>(f: IGetDataFunction<T>, initValue?: T): AsyncLoader<T>;
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
declare module "ng-helpers/fa-loading/ctrl" {
    import BaseCtrl from "ng-helpers/utils/base-ctrl";
    export class Ctrl extends BaseCtrl {
        readonly IsLoading: boolean;
    }
}
declare module "ng-helpers/fa-loading/directive" {
    import * as angular from "angular";
    export var directiveName: string;
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
declare module "ng-helpers/debug/debug-components" {
    export default function register(m: ng.IModule): void;
    export module ifDebug {
        var directiveName: string;
        function register(m: ng.IModule): void;
    }
    export module ifNotDebug {
        var directiveName: string;
        function register(m: ng.IModule): void;
    }
}
declare module "ng-helpers/debug/debug" {
    export default function Register(m: ng.IModule): void;
}
declare module "ng-helpers/formly/datepicker" {
    export function Configure(app: ng.IModule): void;
}
declare module "ng-helpers/formly/form-builder" {
    export default function register(m: ng.IModule): void;
}
declare module "ng-helpers/formly/nullable-field-directive" {
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    export default function register(m: ng.IModule): void;
    export class NullableFieldCtrl extends BaseInjectable {
        static $inject: string[];
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
declare module "ng-helpers/formly/index" {
    export default function Configure(m: ng.IModule): void;
}
declare module "ng-helpers/show-property" {
    import * as angular from "angular";
    export var directiveName: string;
    export default function register(m: ng.IModule): void;
    export function directive(): angular.IDirective<angular.IScope>;
}
declare module "ng-helpers/init" {
    export default function init(m: ng.IModule): void;
}
declare module "ng-helpers/utils/base-service" {
    import BaseInjectable from "ng-helpers/utils/base-injectable";
    import * as ngUtilsService from "ng-helpers/service";
    export default abstract class BaseService extends BaseInjectable {
        static $inject: string[];
        protected readonly $ngUtils: ngUtilsService.NgUtilsService;
    }
}
