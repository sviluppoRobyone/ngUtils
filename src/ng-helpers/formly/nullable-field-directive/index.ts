
import * as d from "./directive";

export function register(m: ng.IModule) {
    m.directive(d.name, d.directive);
}