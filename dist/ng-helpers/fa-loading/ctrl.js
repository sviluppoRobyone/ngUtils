define(["require", "exports", "../base-ctrl"], function (require, exports, base_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ctrl extends base_ctrl_1.BaseCtrl {
        get IsLoading() {
            return !!this.$scope["isLoading"];
        }
    }
    exports.Ctrl = Ctrl;
});
//# sourceMappingURL=ctrl.js.map