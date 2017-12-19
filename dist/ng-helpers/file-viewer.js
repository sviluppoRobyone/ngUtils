define(["require", "exports", "./base-injectable"], function (require, exports, base_injectable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fileKey = "fileToView";
    exports.serviceName = "fileViewer";
    function register(m) {
        m.service(exports.serviceName, fileViewerService);
    }
    exports.register = register;
    class fileViewerService extends base_injectable_1.BaseInjectable {
        get $uibModal() {
            return this.getFromInject("$uibModal");
        }
        viewFile(file) {
            return this.$uibModal.open({
                controllerAs: "Ctrl",
                controller: ModalCtrl,
                size: "lg",
                resolve: {
                    [fileKey]: () => file
                },
                template: `
                        <div class="modal-header">
                            <h3>Titolo</h3>
                        </div>
                        <div class="modal-body">
                            <div class="embed-responsive embed-responsive-4by3">
                              <iframe class="embed-responsive-item" ng-src="{{Ctrl.dataUri|url}}"></iframe>
                            </div>
                            
                        </div>
                        `
            });
        }
    }
    exports.fileViewerService = fileViewerService;
    class ModalCtrl extends base_injectable_1.BaseInjectable {
        constructor(...args) {
            super(...args);
            this.dataUri = null;
            this.buildDataUri();
        }
        get file() {
            return this.args[ModalCtrl.$inject.indexOf(fileKey)];
        }
        buildDataUri() {
            var reader = new FileReader();
            reader.onload = () => {
                this.dataUri = reader.result;
            };
            reader.readAsDataURL(this.file);
        }
    }
    ModalCtrl.$inject = [].concat(base_injectable_1.BaseInjectable.$inject, [fileKey]);
});
//# sourceMappingURL=file-viewer.js.map