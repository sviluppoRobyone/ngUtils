define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Configure(module) {
        module.config(["angularPromiseButtonsProvider", function (angularPromiseButtonsProvider) {
                angularPromiseButtonsProvider.extendConfig({
                    //language=html
                    spinnerTpl: ' <span class="fa fa-spin fa-circle-o-notch fa-loading"></span> ',
                    disableBtn: true,
                    btnLoadingClass: "is-loading",
                    addClassToCurrentBtnOnly: false,
                    disableCurrentBtnOnly: false,
                    minDuration: false
                });
            }
        ]);
    }
    exports.Configure = Configure;
    exports.directive = {};
});
//# sourceMappingURL=index.js.map