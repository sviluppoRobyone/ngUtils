/// <reference types="angular" />
import { BaseInjectable } from "./utils/base-injectable";
export declare const serviceName = "fileViewer";
export declare function register(m: ng.IModule): void;
export declare class fileViewerService extends BaseInjectable {
    readonly $uibModal: any;
    viewFile(file: File): any;
}
