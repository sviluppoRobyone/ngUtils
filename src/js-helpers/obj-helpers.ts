export default class BaseObj{
  
    public _objInfo:ObjInfo=null;
    public constructor(){
        this._objInfo=new ObjInfo(this);
        Object.defineProperty(this,"_objInfo",{enumerable:false});
    }
}

export class ObjInfo{
    private obj:any=null;

    constructor(obj:any){
        this.obj=obj;
    }
    public get Constructor(){
        return this.obj.constructor;
    }
    public get ClassName(){
        return this.obj.constructor.name;
    }
}