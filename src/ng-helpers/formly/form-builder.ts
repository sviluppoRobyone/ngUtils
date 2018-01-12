import { BaseCtrl } from "../utils/base-ctrl";
import { BaseCtrlForDirective } from "../utils/base-ctrl-for-directive";
export function register(m: ng.IModule) {
  m.directive("formBuilder", directive);
}
function directive(): ng.IDirective {
  return {
    //language=
    template: `
<div class="form-builder">
<form name="f" ng-submit="Ctrl.onSave()" promise-btn>
<fieldset>
<legend>{{Ctrl.title}}</legend>
<formly-form fields="Ctrl.fields" model="Ctrl.model"></formly-form>
<ng-transclude></ng-transclude>
<hr/>
<button class="btn btn-primary" ng-disabled="!f.$valid">SALVA</button>
</fieldset>
</form>
</div>
`,
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
