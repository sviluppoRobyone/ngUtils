/// <reference types="angular" />
/// <reference types="angular-ui-bootstrap" />
import { BaseService } from "./base-service";
import * as angular from "angular";
export declare const serviceName = "fileViewer";
export declare function register(m: ng.IModule): void;
export declare class fileViewerService extends BaseService {
    viewFile(file: File): angular.ui.bootstrap.IModalInstanceService;
}
