define(["require", "exports", "../base-ctrl"], function (require, exports, base_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ModalController extends base_ctrl_1.BaseCtrl {
        constructor(...args) {
            super(...args);
        }
        get Errors() {
            return this.args[ModalController.$inject.indexOf("errors")];
        }
    }
    ModalController.$inject = [].concat([], base_ctrl_1.BaseCtrl.$inject, ["errors", "$injector"]);
    exports.ModalController = ModalController;
});
//# sourceMappingURL=modal-ctrl.js.map