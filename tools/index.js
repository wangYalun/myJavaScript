//常有方法

var o={
    extend:function(obj){
        for(var i in obj){
            this[i]=obj[i];
        }
    }
};

module.exports=o;