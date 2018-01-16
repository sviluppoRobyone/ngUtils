
export function enumerable(value: boolean) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>{
        descriptor.enumerable = value;
    };
}
export function deprecated(message: string = 'Function/method {name} is deprecated.') {
    return (instance, name, descriptor) => {
        var original = descriptor.value;
        var localMessage = message.replace('{name}', name);

        descriptor.value = function() {
            console.warn(localMessage);
            return original.apply(instance, arguments);
        };

        return descriptor;
    };
}
