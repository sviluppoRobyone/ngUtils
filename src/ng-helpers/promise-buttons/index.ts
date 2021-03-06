export default function Configure(m: ng.IModule) {

    
    m.config(["angularPromiseButtonsProvider", (angularPromiseButtonsProvider) => {
            angularPromiseButtonsProvider.extendConfig({
              
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
