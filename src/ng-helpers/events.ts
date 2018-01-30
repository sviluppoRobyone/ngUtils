import BaseInjectable from "./utils/base-injectable";
import { GetServiceName } from "./utils/name-generator";


export var serviceName=GetServiceName("events");

export function register(m:ng.IModule){
    m.service(serviceName,EventsService);
}
export enum IEventType {
    
}

export interface IEventFunction {
    (event:ng.IAngularEvent, ...args: any[]):void
}
export class EventsService extends BaseInjectable
{

    public emit<T extends IEventType>(e: T) {
        this.$log.debug("Emit event", e);
        this.$rootScope.$broadcast(e + "");
    }

    public on<T extends IEventType>(e: T, f: IEventFunction) {
        this.$rootScope.$on(e + "", (ae,...args) => {
            this.$log.debug("Detect event", e);
            f(ae,...args);
        });
    }
}