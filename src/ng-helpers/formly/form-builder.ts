import { BaseCtrl } from "../base-ctrl";
import { BaseCtrlForDirective } from "../base-ctrl-for-directive";
import "./test.html";

export function register(m: ng.IModule) {
  m.directive("formBuilder", directive);
}

function directive(): ng.IDirective {
  return {
    //language=
    template:require("test.html"),
    controller: Ctrl,
    controllerAs: "Ctrl",
    transclude: true,
    replace: true,
    scope: {
      model: "=",
      fields: "=",
      onSave: "&"
    }
  };
}

class Ctrl extends BaseCtrlForDirective {
  get model() {
    return this.$scope["model"];
  }
  set model(v) {
    this.$scope["model"] = v;
  }

  get fields() {
    return this.$scope["fields"];
  }

  set fields(v) {
    this.$scope["fields"] = v;
  }

  get title() {
    return this.$attrs["title"] || null;
  }
  onSave() {
    return this.$scope["onSave"]();
  }
}
