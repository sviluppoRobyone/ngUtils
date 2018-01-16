/// <reference types="angular" />
/// <reference types="angular-ui-bootstrap" />
import * as angular from "angular";
import { BaseInjectable } from "./utils/base-injectable";
export declare const serviceName = "fileViewer";
export declare function register(m: ng.IModule): void;
export declare class fileViewerService extends BaseInjectable {
    readonly $uibModal: angular.ui.bootstrap.IModalService;
    viewFile(file: File): angular.ui.bootstrap.IModalInstanceService;
}
