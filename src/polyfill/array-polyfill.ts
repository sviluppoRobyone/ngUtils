

export default function run(){
   polyfill_FIND();
}

function polyfill_FIND(){
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
    
            if (typeof predicate !== "function") {
                throw new TypeError("predicate must be a function");
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;
    
            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
}

declare global{
    interface Array<T> {
        find(predicate: (search: T) => boolean): T;
    }
}
