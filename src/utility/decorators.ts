
export function enumerable(value: boolean) {

    return (target: any, propertyKey: string) =>{
        
        var descriptor=Object.getOwnPropertyDescriptor(target, propertyKey);
        if (descriptor)
            descriptor.enumerable = value;
        
    }
}
export function SetNotEnumerable(){
        return (target: any, propertyKey: string) =>{
            var descriptor=Object.getOwnPropertyDescriptor(target, propertyKey);
            if (descriptor)
            descriptor.enumerable = false;
    }
}
export function SetEnumerable(){
    return (target: any, propertyKey: string) => {
        
        var descriptor=Object.getOwnPropertyDescriptor(target, propertyKey);
        if (descriptor)
        descriptor.enumerable = true;
    
    }
}

