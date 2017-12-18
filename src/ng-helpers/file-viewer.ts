import { BaseService } from "./base-service";
import { BaseCtrl } from "./base-ctrl";
import * as angular from "angular";


    
            const fileKey = "fileToView";
            export const serviceName = "fileViewer";

            export function register(m: ng.IModule) {

                m.service(serviceName, fileViewerService);

            }

            export class fileViewerService extends BaseService {
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

            class ModalCtrl extends BaseCtrl {

                static $inject = ([] as string[]).concat(BaseCtrl.$inject, [fileKey]);

                get file():File {
                    return this.args[ModalCtrl.$inject.indexOf(fileKey)];
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


