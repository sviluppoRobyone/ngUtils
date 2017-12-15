/// <reference types="angular-formly" />
/// <reference types="angular" />
export declare class Ctrl {
    static $inject: string[];
    private args;
    fields: AngularFormly.IFieldArray;
    constructor(...args: any[]);
    readonly $scope: ng.IScope;
    $model: any;
    readonly $type: any;
    readonly $label: any;
    formModel: {
        isNull: boolean;
        model: any;
    };
}
