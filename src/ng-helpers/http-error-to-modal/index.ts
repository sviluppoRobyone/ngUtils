import { Interceptor } from "./interceptor";

export default function register(m: ng.IModule) {
  var factoryName = "HttpErrorToModalFactory";
  m.config([
    "$httpProvider",
    ($httpProvider: ng.IHttpProvider) => {
      $httpProvider.interceptors.push(factoryName);
    }
  ]);
  const arr = ([] as any[]).concat(Interceptor.$inject as any[]);
  arr.push((...args) => {
    return new Interceptor(...args);
  });
  m.factory(factoryName, arr);
}
