/// <reference types="angular" />
/// <reference types="angular-ui-bootstrap" />
/// <reference types="ng-file-upload" />
/// <reference types="angular-ui-router" />
/// <reference types="angular-formly" />
interface Array<T> {
    find(predicate: (search: T) => boolean): T;
}
declare module "file-helpers/index" {
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
declare module "utility/decorators" {
    export function enumerable(value: boolean): (target: any, propertyKey: string) => void;
    export function SetNotEnumerable(): (target: any, propertyKey: string) => void;
    export function SetEnumerable(): (target: any, propertyKey: string) => void;
}
declare module "ng-helpers/utils/base-injectable" {
    export abstract class BaseInjectable {
        static $inject: string[];
        private _store;
        private _args;
        protected getFromInject<T>(key: string): T;
        constructor(...args: any[]);
        protected readonly $injector: ng.auto.IInjectorService;
        protected readonly $injectedArgs: any[];
    }
}
declare module "ng-helpers/file-viewer" {
    import * as angular from "angular";
    import { BaseInjectable } from "ng-helpers/utils/base-injectable";
    export const serviceName = "fileViewer";
    export function register(m: ng.IModule): void;
    export class fileViewerService extends BaseInjectable {
        readonly $uibModal: angular.ui.bootstrap.IModalService;
        viewFile(file: File): angular.ui.bootstrap.IModalInstanceService;
    }
}
declare module "ng-helpers/utils/name-generator" {
    export function GetServiceName(name: any): string;
    export function GetDirectiveName(name: any): any;
}
declare module "ng-helpers/debug/debug-service" {
    import * as bi from "ng-helpers/utils/base-injectable";
    export function register(m: ng.IModule): void;
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
        function IsDev(): any;
    }
    export class Service extends bi.BaseInjectable {
        private readonly $timeout;
        private readonly $rootScope;
        private readonly $q;
        DebugStatus: boolean;
        private Updater;
        constructor(...args: any[]);
        private UpdateStatus();
        private init();
        SetDebugUpdater(f: IDebugDetectorFunction): void;
        readonly updateDebugV1: any;
    }
}
declare module "ng-helpers/service" {
    import * as angular from "angular";
    import * as bi from "ng-helpers/utils/base-injectable";
    import * as fv from "ng-helpers/file-viewer";
    import * as debugService from "ng-helpers/debug/debug-service";
    export var serviceName: string;
    import * as AsyncLoader from "ng-helpers/async-loader";
    export function register(m: ng.IModule): void;
    export class Service extends bi.BaseInjectable {
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
    import * as bj from "ng-helpers/utils/base-injectable";
    export var serviceName: string;
    export function register(m: ng.IModule): void;
    export interface IGetDataFunction<T> {
        (resolve: ng.IQResolveReject<T>, reject: ng.IQResolveReject<any>): void;
    }
    export interface IAsyncLoaderConstructor<T> {
        $q: ng.IQService;
        $timeout: ng.ITimeoutService;
        Fn: IGetDataFunction<T>;
    }
    export class Config<T> {
        args: IAsyncLoaderConstructor<T>;
        isLoading: boolean;
        isSuccess: boolean;
        isFailed: boolean;
        successCount: number;
        GetDataFn: IGetDataFunction<T>;
    }
    export class AsyncLoader<T> {
        protected readonly $q: angular.IQService;
        protected readonly $timeout: angular.ITimeoutService;
        private _config;
        protected readonly IsLoading: boolean;
        protected readonly IsSuccess: boolean;
        protected readonly IsFailed: boolean;
        private _Data;
        readonly Data: T;
        constructor(c: IAsyncLoaderConstructor<T>);
        Update(): angular.IPromise<{}>;
    }
    export class Service extends bj.BaseInjectable {
        protected readonly $q: angular.IQService;
        protected readonly $timeout: angular.ITimeoutService;
        Create<T>(f: IGetDataFunction<T>): AsyncLoader<T>;
    }
}
declare module "ng-helpers/filters/index" {
    export function html(m: ng.IModule): void;
    export function url(m: ng.IModule): void;
    export function bytes(m: ng.IModule): void;
    export function RegisterAllFilters(m: ng.IModule): void;
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
    import { BaseInjectable } from "ng-helpers/utils/base-injectable";
    export abstract class BaseCtrl extends BaseInjectable implements ng.IController {
        static $inject: string[];
        protected readonly $scope: angular.IScope;
        protected readonly $ngUtils: ngUtils.Service;
        protected readonly $q: angular.IQService;
        protected readonly $state: angular.ui.IStateService;
        protected readonly $stateParams: angular.ui.IStateParamsService;
        protected readonly $upload: angular.angularFileUpload.IUploadService;
        protected readonly $uibModal: angular.ui.bootstrap.IModalService;
    }
}
declare module "ng-helpers/fa-loading/ctrl" {
    import { BaseCtrl } from "ng-helpers/utils/base-ctrl";
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
    export function register(m: ng.IModule): void;
}
declare module "ng-helpers/promise-buttons/index" {
    export function Configure(module: ng.IModule): void;
}
declare module "ng-helpers/http-error-to-modal/modal-ctrl" {
    import { BaseCtrl } from "ng-helpers/utils/base-ctrl";
    export var ErrorKey: string;
    export class Ctrl extends BaseCtrl {
        static $inject: string[];
        readonly Errors: any;
    }
}
declare module "ng-helpers/http-error-to-modal/interceptor" {
    import * as angular from "angular";
    import { BaseInjectable } from "ng-helpers/utils/base-injectable";
    export class Interceptor extends BaseInjectable implements ng.IHttpInterceptor {
        static $inject: string[];
        private errorList;
        private readonly $q;
        private readonly $uibModal;
        private $modal;
        responseError: (rejection: any) => angular.IPromise<never>;
    }
}
declare module "ng-helpers/http-error-to-modal/index" {
    export function register(m: ng.IModule): void;
}
declare module "ng-helpers/debug/debug-modal" {
    export function register(m: ng.IModule): void;
}
declare module "ng-helpers/formly/datepicker" {
    export function Configure(app: ng.IModule): void;
}
declare module "ng-helpers/utils/base-ctrl-for-directive" {
    import { BaseCtrl } from "ng-helpers/utils/base-ctrl";
    export abstract class BaseCtrlForDirective extends BaseCtrl {
        static $inject: string[];
        protected readonly $attrs: ng.IAttributes;
    }
}
declare module "ng-helpers/formly/form-builder" {
    export function register(m: ng.IModule): void;
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
    export function Configure(m: ng.IModule): void;
}
declare module "polyfill/string-prototype" {
    export function run(): void;
    global  {
        interface String {
            endsWith(search: string, len?: number): boolean;
        }
    }
}
declare module "polyfill/array-prototype" {
    export function run(): void;
    global  {
        interface Array<T> {
            find(predicate: (search: T) => boolean): T;
        }
    }
}
declare module "polyfill/all" {
    export function run(): void;
}
declare module "ng-helpers/init" {
    export function init(m: ng.IModule): void;
}
declare module "ng-helpers/formly/nullable-date" {
    export function NullableDate(key: string, label: string): AngularFormly.IFieldArray;
}
declare module "ng-helpers/utils/base-service" {
    import * as angular from "angular";
    import { BaseInjectable } from "ng-helpers/utils/base-injectable";
    import * as ngUtilsService from "ng-helpers/service";
    export abstract class BaseService extends BaseInjectable {
        static $inject: string[];
        protected readonly $ngUtils: ngUtilsService.Service;
        protected readonly $uibModal: angular.ui.bootstrap.IModalService;
        protected readonly $q: angular.IQService;
    }
}
declare module "random-helpers/string" {
    export function randomStringV1(length: number): string;
}
