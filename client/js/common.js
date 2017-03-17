/**
 * JavaScript常有方法总结
 */

var common = {};
/**
 * 返回字符串长度，汉子计数为2
 */
common.strLength = function (str) {
    var a = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255)
            a += 2;//按照预期计数增加2
        else
            a++;
    }
    return a;
};

/**
 * 获取URL中的查询参数
 */
common.getQueryStringArgs = function () {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = item[0];
        value = item[1];
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
};

/**
 * 绑定事件
 */
common.eventBind = function (dom, type, callback, isCatch) {
    if (typeof isCatch === 'undefined') {
        isCatch = false;
    }
    if (window.addEventListener) {
        dom.addEventListener(type, callback, isCatch);
    } else if (window.attachEvent) {
        dom.attachEvent('on' + type, callback);
    } else {
        dom['on' + type] = callback;
    }
};


/**
 * 测试代码
 */
(function () {
    String.prototype.strLength = function () {
        return common.strLength(this.toString());
    }
    console.log("你好啊".strLength());
    var 你好啊 = 'fasd';
    console.log(你好啊);

    console.log(undefined==null);
})();
