import * as angular from "angular";
import BaseInjectable from "./utils/base-injectable";
import * as fv from "./file-viewer";
import * as nameGenerator from "./utils/name-generator";
import * as debugService from "./debug/debug-service";
export var serviceName=nameGenerator.GetServiceName("$ngUtils");
import * as AsyncLoader from "./async-loader";
import { registerService } from "./core";

export default function register(m:ng.IModule){
    registerService(m,serviceName,Service);
}
export class Service extends BaseInjectable {
    public static $inject= BaseInjectable.$inject.concat([debugService.serviceName,AsyncLoader.serviceName,fv.serviceName]);

  
   
    public get $debugService():debugService.Service{
        return this.$injectedArgs[Service.$inject.indexOf(debugService.serviceName)];
    }
    public get $fileViewer():fv.fileViewerService{        
        return this.$injectedArgs[Service.$inject.indexOf(fv.serviceName)];
    }
    public get $asyncLoader():AsyncLoader.Service{
        return this.$injectedArgs[Service.$inject.indexOf(AsyncLoader.serviceName)];
    }

    ///@deprecated
    manageAjaxLoading(before: Function, ajax: (ok: ng.IQResolveReject<any>, ko: ng.IQResolveReject<any>) => void, after: Function) {

        var qBefore = this.$q.defer();
        var qAjax = this.$q.defer();
        var qAfter = this.$q.defer();

        var doBefore = () => {
            this.$timeout(() => {
                before && before();
            }).then(() => {
                qBefore.resolve();
            });
        }
        var doAfter = () => {
            this.$timeout(() => {
                after && after();
            }).then(() => {
                qAfter.resolve();
            });
        }
        qBefore.promise.then(() => {
            ajax(qAjax.resolve, qAjax.reject);
        });
        qAjax.promise.then(() => {
            doAfter();
        });

        return this.$q((ok, ko) => {
            qAfter.promise.then(() => {
                ok();
            });
            doBefore();
        });
    }

    onScopeDispose($scope: ng.IScope) {
        var q = this.$q.defer();
        $scope.$on("$destroy", () => {
            q.resolve();
        });
        return q.promise;
    }


}