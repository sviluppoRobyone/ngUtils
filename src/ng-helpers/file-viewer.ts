import * as angular from "angular";
import  BaseInjectable  from "./utils/base-injectable";
import { registerService } from "./core";



    
            const configKey = "fileToView";
            export const serviceName = "fileViewer";

            export default function register(m: ng.IModule) {
                registerService(m,serviceName,fileViewerService);
               

            }
            export interface fileViewerConfig{
                Blob:Blob,
                Title:string,
                FileName:string,
                MimeType:string
            }
            export class fileViewerService extends BaseInjectable {
               
                viewFile(config:fileViewerConfig) {

                    return this.$uibModal.open({
                        controllerAs: "Ctrl",
                        controller: ModalCtrl,
                        
                        size: "file",
                        resolve: {
                            [configKey]: () => config
                        },
                        template:
                        `
                        <div class="modal-header">
                            <h3>{{Ctrl.config.Title}}</h3>
                        </div>
                        <div class="modal-body">
                            <div class="embed-responsive embed-responsive-4by3">
                              <iframe class="embed-responsive-item" ng-if="Ctrl.dataUri" ng-src="{{Ctrl.dataUri|url}}"></iframe>
                            </div>
                            
                        </div>
                        `
                    })
                }
            }

            class ModalCtrl extends BaseInjectable {

                public static $inject = BaseInjectable.$inject.concat([configKey]);
                
                private get config():fileViewerConfig {
                    return this.$injectedArgs[ModalCtrl.$inject.indexOf(configKey)];
                }

                dataUri: string=null;
                constructor(...args) {
                    super(...args);
                    this.buildDataUri();
                    
                }

                buildDataUri() {
                    var f=new File([this.config.Blob],this.config.FileName,{type:this.config.MimeType});
                    var reader = new FileReader();
                    reader.onload=() => {
                        this.dataUri = reader.result;
                    };
                    reader.readAsDataURL(f);

                }
            }


