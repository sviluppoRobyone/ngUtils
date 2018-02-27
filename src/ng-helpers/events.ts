import BaseInjectable from "./utils/base-injectable";
import { GetServiceName } from "./utils/name-generator";


export var serviceName=GetServiceName("events");

export function register(m:ng.IModule){
    m.service(serviceName,EventsService);
}
export interface IEventFunction {
    (event:ng.IAngularEvent, ...args: any[]):void
}
export class EventsService extends BaseInjectable
{

    public emit(e: string,...args:any[]) {
        this.$log.debug("Emit event", e);
        this.$rootScope.$broadcast(e + "",...args);
    }

    public on(e: string, f: IEventFunction) {
        this.$rootScope.$on(e, (ae,...args) => {
            this.$log.debug("Detect event", e);
            f(ae,...args);
        });
    }
}