import * as angular from "angular";
import BaseInjectable from "./utils/base-injectable";
import * as fv from "./file-viewer";
import * as nameGenerator from "./utils/name-generator";
import * as AsyncLoader from "./async-loader";
import { registerService, ConcatenaInject } from "./core";
import * as events from "./events";

export const serviceName=nameGenerator.GetServiceName("ngUtils");
export default function register(m:ng.IModule){
    registerService(m,serviceName,NgUtilsService);
}
export class NgUtilsService extends BaseInjectable {
    public static $inject= ConcatenaInject(
        BaseInjectable.$inject,
        AsyncLoader.serviceName,
        fv.serviceName,
        events.serviceName
    );
 
    
    public get $events():events.EventsService{
        return this.GetInjected(events.serviceName);
    }   
  
    public get $fileViewer():fv.fileViewerService{        
        return this.GetInjected(fv.serviceName);
    }
    public get $asyncLoader():AsyncLoader.AsyncLoaderService{
        return this.GetInjected(AsyncLoader.serviceName);
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