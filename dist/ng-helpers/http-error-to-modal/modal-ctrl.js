var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "../utils/base-ctrl", "../../utility/decorators"], function (require, exports, base_ctrl_1, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorKey = "ModalErrorData";
    var Ctrl = /** @class */ (function (_super) {
        __extends(Ctrl, _super);
        function Ctrl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Ctrl.prototype, "Errors", {
            get: function () {
                return this.$injectedArgs[Ctrl.$inject.indexOf(exports.ErrorKey)];
            },
            enumerable: true,
            configurable: true
        });
        Ctrl.$inject = base_ctrl_1.BaseCtrl.$inject.concat([exports.ErrorKey]);
        __decorate([
            decorators_1.enumerable(true),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], Ctrl.prototype, "Errors", null);
        return Ctrl;
    }(base_ctrl_1.BaseCtrl));
    exports.Ctrl = Ctrl;
});
//# sourceMappingURL=modal-ctrl.js.map