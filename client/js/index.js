var whenReady = (function () {
    var funcs = []; //当获得事件时，要运行的函数
    var ready = false;//当触发事件处理程序时，切换到true;

    function handler(e) {
        if (ready) return;
        //如果发生readystatechange事件,
        //但其状态不是“complete”的话，那么文档尚未准备好
        if (e.type === "readystatechange" && document.readyState !== "complete") {
            return;
        }

        //运行所有注册函数
        //注意每次都要调用funcs.length
        //以防这些函数的调用会注册更多的函数
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }
        //现在设置ready为true,并移除所有函数
        ready = true;
        funcs = null;
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", hanlder);
        window.attachEvent("onload", hanlder);
    }

    return function whenReady(f) {
        if (ready) {
            f.call(document);
        } else {
            funcs.push(f);
        }
    }
})();

function loadJavaScriptAsync(url) {
    var head = document.getElementsByTagName("head")[0];
    var s = document.createElement("script");
    s.src = "js/asyncLoad.js";
    head.appendChild(s);
}
whenReady(function () {
    (function () {
        var navigatorObj = {};
        for (var i in window.navigator) {
            if (typeof window.navigator[i] === 'string') {
                navigatorObj[i] = window.navigator[i];
            }
        }

        client.report(client.addSerialize(client.serverURL + '/api_receiver/client_info', client.serialize(navigatorObj)));
    })();
});

/**
 * 获取浏览器信息,navigator 
 */


var client = {};

client.report = (function () {

    var imgs = [];
    return function (src) {
        var img = new Image();
        // imgs.push(img);
        img.src = src;
    };
})();

client.serverURL = "http://" + document.domain + ":8081";

client.serialize = function (data) {
    if (typeof data !== 'object') {
        return '';
    }
    var parts = [];
    for (var i in data) {
        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
    }
    return parts.join("&");
}

client.addSerialize = function (url, serialize) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += serialize;
    return url;
};

/**
 * 客户端JavaScript 时间线
 */

/**
 * 1. WEB浏览器创建Document 对象，并且开始解析WEB页面，解析HTML元素和它们的文本内容后添加到Element对象和Text节点到文本中。  
 *    在这个阶段的document.readystate 属性的值是loading
 * 2. 当文档解析完成，document.readyState 的属性变成 "interactive"
 * 3. 所有的defer 属性的脚本，会按他们在文档的里出现顺序执行；
 * 4. 浏览器的Document对象触发DOMContentLoaded 事件，这时可能还有异步脚本没有执行完成；
 * 5. 文档已经全部解析完成，但是浏览器可能还在等待其他内容载入，如图片；当所有这些内容完成载入时，并且所有异步脚本完成载入和执行，
 *    document.readyState 属性改成"complete",web浏览器触发Window对象上的load事件
 */

/**
 * 怪异模式和标准模式
 */
(function () {
    console.log(document.compatMode);//CSS1Compat 标准模式 BackCompat 怪异模式
    //所有现代浏览器都实现了compatMode属性,并且HTML5规范对它进行了标准化

    /**
     * Internet Explorer里的条件注释
     */
    //IE支持条件注释，尽管这种做法并不符合标准规范，但是在处理不兼容性时非常有用，见HTML
    //IE 的JavaScript 解释器也支持条件注释,IE 的JavaScript条件注释以文本/*@cc_on 开头，以文本@*/ 结束,
    //下面的条件注释包含了只在IE中执行的代码

    /*@cc_on
        @if(@_jscript)
        alert("In IE");
        @end
    @*/

    /*@cc_on
        @if(@_jscript)
         //IE会执行这段代码,其他浏览器不执行它
         alert("You are using Internet Explorer");
        @else*/
    //这段代码并没有再JavaScript 注释中，但仍然在IE条件下注释中
    //也就是说出IE外，其他浏览器都执行这里的代码
    //alert("You are not using Internet Explorer");
    /*@end@*/

    /**
     * 第14章 window对象
     * 
     */

    //Location  http://localhost?name=allen#ddd 
    window.location === document.location; //true
    location.search //?name=allen
    location.hash //#ddd

    // location.assign(); //会把当前页面压入浏览历史
    // location.replace(); //直接替换当前文档
    // location.reload(); //重新加载当前文档

    /**
     * History 对象
     */
    history.length //表示浏览器历史列表中的元素数量   



})();
