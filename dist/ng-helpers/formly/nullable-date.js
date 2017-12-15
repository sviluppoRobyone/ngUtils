define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function NullableDate(key, label) {
        console &&
            console.warn &&
            console.warn("Usare la directive nullabled-field anzichè la funzione nullableDate");
        return [
            {
                key: key,
                type: "input",
                templateOptions: {
                    type: "datetime-local",
                    label: label
                },
                expressionProperties: {
                    "templateOptions.disabled": function ($viewValue, $modelValue, scope) {
                        return !!scope.model["Not" + key];
                    },
                    "templateOptions.required": function ($viewValue, $modelValue, scope) {
                        return !scope.model["Not" + key];
                    }
                }
            },
            {
                key: "Not" + key,
                type: "awesome-checkbox",
                templateOptions: {
                    label: "Senza " + label,
                    onChange: function ($viewValue, $modelValue, scope) {
                        if ($viewValue || $modelValue)
                            scope.model[key] = null;
                    }
                },
            }
        ];
    }
    exports.NullableDate = NullableDate;
});
//# sourceMappingURL=nullable-date.js.map