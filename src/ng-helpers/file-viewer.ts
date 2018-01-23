import * as angular from "angular";
import { BaseInjectable } from "./utils/base-injectable";
import { registerService } from "./core";



    
            const fileKey = "fileToView";
            export const serviceName = "fileViewer";

            export function register(m: ng.IModule) {
                registerService(m,serviceName,fileViewerService);
               

            }

            export class fileViewerService extends BaseInjectable {
                get $uibModal(){
                    return this.getFromInjector<angular.ui.bootstrap.IModalService>("$uibModal");
                }
                viewFile(file: File) {

                    return this.$uibModal.open({
                        controllerAs: "Ctrl",
                        controller: ModalCtrl,
                        size: "lg",
                        resolve: {
                            [fileKey]: () => file
                        },
                        template:
                        `
                        <div class="modal-header">
                            <h3>Titolo</h3>
                        </div>
                        <div class="modal-body">
                            <div class="embed-responsive embed-responsive-4by3">
                              <iframe class="embed-responsive-item" ng-src="{{Ctrl.dataUri|url}}"></iframe>
                            </div>
                            
                        </div>
                        `
                    })
                }
            }

            class ModalCtrl extends BaseInjectable {

                public static $inject = BaseInjectable.$inject.concat([fileKey]);

                get file():File {
                    return this.$injectedArgs[ModalCtrl.$inject.indexOf(fileKey)];
                }
                dataUri: string=null;
                constructor(...args) {
                    super(...args);
                    this.buildDataUri();
                    
                }

                buildDataUri() {
                    var reader = new FileReader();
                    reader.onload=() => {
                        this.dataUri = reader.result;
                    };
                    reader.readAsDataURL(this.file);

                }
            }


