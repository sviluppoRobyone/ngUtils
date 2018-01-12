//https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search:string, this_len:number=undefined) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
        return this.substring(this_len - search.length, this_len) === search;
	};
}


declare interface String {
    endsWith(search : string, len?:number) : boolean;
}
