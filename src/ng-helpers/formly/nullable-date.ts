   export default function NullableDate(key: string, label: string): AngularFormly.IFieldArray {
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
                        "templateOptions.disabled": ($viewValue, $modelValue, scope) => {
                            return !!scope.model[`Not${key}`];
                        },
                        "templateOptions.required": ($viewValue, $modelValue, scope) => {
                            return !scope.model[`Not${key}`];
                        }
                    }

                },
                {
                    key: `Not${key}`,
                    type: "awesome-checkbox",

                    templateOptions: {
                        label: `Senza ${label}`,
                        onChange: ($viewValue, $modelValue, scope) => {

                            if ($viewValue || $modelValue)
                                scope.model[key] = null;
                        }
                    },


                }
            ];
}