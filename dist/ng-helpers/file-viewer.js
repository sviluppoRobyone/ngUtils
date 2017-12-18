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
define(["require", "exports", "./base-service", "./base-ctrl"], function (require, exports, base_service_1, base_ctrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fileKey = "fileToView";
    exports.serviceName = "fileViewer";
    function register(m) {
        m.service(exports.serviceName, fileViewerService);
    }
    exports.register = register;
    var fileViewerService = /** @class */ (function (_super) {
        __extends(fileViewerService, _super);
        function fileViewerService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        fileViewerService.prototype.viewFile = function (file) {
            return this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: ModalCtrl,
                size: "lg",
                resolve: (_a = {},
                    _a[fileKey] = function () { return file; },
                    _a),
                template: "\n                        <div class=\"modal-header\">\n                            <h3>Titolo</h3>\n                        </div>\n                        <div class=\"modal-body\">\n                            <div class=\"embed-responsive embed-responsive-4by3\">\n                              <iframe class=\"embed-responsive-item\" ng-src=\"{{Ctrl.dataUri|url}}\"></iframe>\n                            </div>\n                            \n                        </div>\n                        "
            });
            var _a;
        };
        return fileViewerService;
    }(base_service_1.BaseService));
    exports.fileViewerService = fileViewerService;
    var ModalCtrl = /** @class */ (function (_super) {
        __extends(ModalCtrl, _super);
        function ModalCtrl() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.dataUri = null;
            _this.buildDataUri();
            return _this;
        }
        Object.defineProperty(ModalCtrl.prototype, "file", {
            get: function () {
                return this.args[ModalCtrl.$inject.indexOf(fileKey)];
            },
            enumerable: true,
            configurable: true
        });
        ModalCtrl.prototype.buildDataUri = function () {
            var _this = this;
            var reader = new FileReader();
            reader.onload = function () {
                _this.dataUri = reader.result;
            };
            reader.readAsDataURL(this.file);
        };
        ModalCtrl.$inject = [].concat(base_ctrl_1.BaseCtrl.$inject, [fileKey]);
        return ModalCtrl;
    }(base_ctrl_1.BaseCtrl));
});
//# sourceMappingURL=file-viewer.js.map