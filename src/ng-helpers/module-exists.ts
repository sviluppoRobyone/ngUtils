import * as angular from "angular";

export function moduleExists(m: ng.IModule, names: string[]) {
  var cnt = 0;
  try {
    if (!!angular.module(name) && m.requires.some(x => x == name)) {
      cnt++;
    }
  } catch (e) {
    return false;
  }
  return cnt == names.length;
}
export function configureModuleIfExists(
  m: ng.IModule,
  moduleNames: string[],
  fn: Function
) {
  if (moduleExists(m, moduleNames)) {
    try {
      fn();
    } catch (e) {
      console.error(
        "NgUtils: error configuring module " + JSON.stringify(moduleNames)
      );
      console.error(e);
    }
  } else {
    console.info(
      "NgUtils: module configuration " +
        JSON.stringify(moduleNames) +
        " skipped"
    );
  }
}
