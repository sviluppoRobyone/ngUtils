

export default function run(){
   polyfill_FIND();
   custom_ClearAndSet();
   custom_Clear();
   describe();
}
function toJSON(){
    if (!Array.prototype.toJSON) {

        Array.prototype.toJSON=function(){
            return JSON.stringify(this);
        }
    }
}
function describe(){
    if (!Array.prototype.describe) {
        Array.prototype.describe=function(){
            return this.map(x=>{
                return (typeof (x) ===typeof ({}) ? x.constructor.name:typeof(x))+"";
            });
        }
    }
}
function custom_ClearAndSet(){
    if (!Array.prototype.clearAndSet) {
        Array.prototype.clearAndSet=function(newData){
            if (!(newData instanceof Array)) {
                throw new TypeError("newData must be an array");
            }
            var arr= this as any[];
            arr.clear();
            arr.push(...newData);

            return arr;
            
        };
    }
}
function custom_Clear(){
    Array.prototype.clear=function(){
        var list = this as any[];
        list.splice(0,list.length);
        return list;
    };
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
        clearAndSet(arr:T[]):T[];
        clear():T[];
        describe():T[];
        toJSON():string
    }
}
