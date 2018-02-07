import * as angular from "angular";
import { GetLogger } from "../log";

export function moduleExists(m: ng.IModule, names: string[]) {
  return names.every(x=>m.requires.some(y=>y==x));
}
export function configureModuleIfExists(
  m: ng.IModule,
  moduleNames: string[],
  fn: Function
) {

  var $log=GetLogger();
  if (moduleExists(m, moduleNames)) {
    try {



      fn();
    } catch (e) {

      
      $log.error(
        "NgUtils: error configuring module " + JSON.stringify(moduleNames)
      );
      $log.error(e);
    }
  } else {
    $log.debug(
      "NgUtils: module configuration " +
        moduleNames.asJSON() +
        " skipped"
    );
  }
}
