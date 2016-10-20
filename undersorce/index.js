(function (window) {
    var root=this;
    
    console.log(void 0 === a);
    //用void 0 代替 undefined

    var _=function(obj){
        if(obj instanceof _) return obj;
        if(!(this instanceof _)) return new _(obj);
        this._wrapped=obj;
    }
    
    

    //_.isArray=nativeIsArray||

})(global);


