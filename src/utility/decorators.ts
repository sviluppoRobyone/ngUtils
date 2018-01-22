
export function enumerable(value: boolean) {
    return function (target: any, propertyKey: string,) {
        
        var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey); 
               
        if (descriptor && descriptor.enumerable!==value) {
            descriptor.enumerable = value;
            Object.defineProperty(target, propertyKey, descriptor);
        }else{
            Object.defineProperty(target,propertyKey,{enumerable:value,writable:true,configurable:true});
        }
    };
}
