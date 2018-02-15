export abstract class BaseObj{
  
    public _objInfo:ObjInfo=null;
    public constructor(){
        this._objInfo=new ObjInfo(()=>this);
        Object.defineProperty(this,"_objInfo",{enumerable:false});        
    }
}

export class ObjInfo{
   
    private GetFn:{():any}=null;
    private get Obj(){
        return this.GetFn();
    }

    constructor(GetObj:{():any}){
        this.GetFn=GetObj;
    }
    public get ObjConstructor(){
        return this.Obj.constructor;
    }
    public get ClassName(){
        return this.Obj.constructor.name;
    }
}