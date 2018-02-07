export const DebugName = "DEBUG";
export function IsLocalhost(){
    return window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1";
}
export function IsLocalDomain(){
    return window.location.hostname.endsWith(".local");
}
export function IsWindowDebugDefined(){
    return typeof window[DebugName]!=="undefined";
}

export function GetWindowDebugValue(){
    if (!IsWindowDebugDefined()) throw "["+DebugName+"] must be defined in window: window."+DebugName+"=true/false;";

    return window[DebugName];
}

export function IsDebugEnabled(){
    return IsWindowDebugDefined()?GetWindowDebugValue():(IsLocalhost() || IsLocalDomain());
}

export var status ={
    get IsLocalhost(){
        return IsLocalhost();
    },
    get IsLocalDomain(){
        return IsLocalDomain();
    },
    get IsWindowDebugDefined(){
        return IsWindowDebugDefined();
    },
    get GetWindowDebugValue(){
        return IsWindowDebugDefined()? window[DebugName]:null;
    },

    get IsDebugEnabled(){
        return IsDebugEnabled();
    }

}