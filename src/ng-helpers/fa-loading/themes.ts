import * as angular from "angular";
import * as d from "./directive";

export namespace baseTheme {
  export function DirectiveBuilder(loadingTemplate: string) {
    return () => {
      console.log(loadingTemplate);
      var originalDirective = d.directive();

      originalDirective.transclude = true;
      //language=html
      originalDirective.template = `
                    <fa-loading is-loading="Ctrl.IsLoading">
                        <loading>${loadingTemplate}</loading>
                        <content ng-transclude>
                         
                        </content>
                    </fa-loading>
    `;
      return originalDirective;
    };
  }
}
