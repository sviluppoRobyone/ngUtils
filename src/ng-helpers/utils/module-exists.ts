import * as angular from "angular";

export function moduleExists(m: ng.IModule, names: string[]) {
  return names.every(x=>m.requires.some(y=>y==x));
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
