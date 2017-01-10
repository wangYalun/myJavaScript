var whenReady=(function(){
    var funcs=[]; //当获得事件时，要运行的函数
    var ready=false;//当触发事件处理程序时，切换到true;
    
    function handler(e){
        if(ready) return ;
        //如果发生readystatechange事件,
        //但其状态不是“complete”的话，那么文档尚未准备好
        if(e.type==="readystatechange"&&document.readyState!=="complete"){
            return;
        }

        //运行所有注册函数
        //注意每次都要调用funcs.length
        //以防这些函数的调用会注册更多的函数
        for(var i=0;i<funcs.length;i++){
            funcs[i].call(document);
        }
        //现在设置ready为true,并移除所有函数
        ready=true;
        funcs=null;
    }

    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",handler,false);
        document.addEventListener("readystatechange",handler,false);
        window.addEventListener("load",handler,false);
    }else if(document.attachEvent){
        document.attachEvent("onreadystatechange",hanlder);
        window.attachEvent("onload",hanlder);
    }

    return function whenReady(f){
        if(ready){ 
            f.call(document);
        }else{
            funcs.push(f);
        }
    }
})();

whenReady(function(){
    console.log("文档加载完毕");
    document.write("文档加载完毕");
});