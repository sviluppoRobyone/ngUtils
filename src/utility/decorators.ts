
export function enumerable(value: boolean) {
    return function (target: any, propertyKey: string) {
        
        let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);        
        if (descriptor) {
            descriptor.enumerable = value;
            Object.defineProperty(target, propertyKey, descriptor)
        }
    };
}
