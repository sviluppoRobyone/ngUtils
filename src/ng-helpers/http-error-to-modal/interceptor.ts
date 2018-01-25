import * as ModalController from "./modal-ctrl";
import * as angular from "angular";
import  BaseInjectable  from "../utils/base-injectable";
export class Interceptor  extends BaseInjectable implements ng.IHttpInterceptor {
    
              
                private errorList: any[] = [];
    
                private $modal: angular.ui.bootstrap.IModalServiceInstance = null;
    
    
                public responseError = (rejection) => {
    
                    try {
                        rejection["json"] = JSON.parse(rejection.data);
    
                        if (rejection["json"]["Response"]) {
                            rejection["json"] = JSON.parse(rejection["json"]["Response"]);
                        }
                    } catch (e) {
                        rejection["json"] = null;
                    }
    
    
    
                    this.errorList.push(rejection);
    
                    if (!this.$modal) {
                        this.$modal = this.$uibModal.open({
                            controllerAs: "Ctrl",
                            resolve: {
                                [ModalController.ErrorKey]: () => {
                                    return this.errorList;
                                }
                            },
                            controller: ModalController.Ctrl,
      
                    
                            template:
                         
                            `
                        <div class="modal-header">
                            <h4 class="modal-title" >
                                Si è verificato un errore
                            </h3>
                        </div>
                        <div class="modal-body">
                            
                            <div ng-repeat="e in Ctrl.Errors" class="well well-sm" >
                            
                                <p>
                                    <small ng-if="e.status">{{e.status}}</small>
                                    <small ng-if="e.statusText">{{e.statusText}}</small>
                                    <code  ng-if="e.config.url">{{e.config.url}}</code>
                              
                                </p>
                                <div ng-if="e.json">
                                    <p class="lead" ng-if="e.json.Message">Messaggio: <em>{{e.json.Message}}</em></p>
                                    <span ng-if="e.json.Source=='EntityFramework' && e.json.InnerException"> 
                                        <ul ng-repeat="e in e.json.InnerException.Errors">
                                            <li>{{e.message}}</li>
                                        </ul>
                                    </span>
                                    <div ng-if="e.json.ModelState">
                                        <dl ng-repeat="(key,errs) in e.json.ModelState">
                                            <dt>{{key}}</dt>
                                            <dd>
                                                    <ul class="list-unstyled" style="margin:0">
                                                    <li ng-repeat="s in errs">{{s}}</li>            
                                        </ul>
                                            </dd>
                                        </dl> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
    `
    
                        });
                    }
                    return this.$q.reject(rejection);
                }
    
    }