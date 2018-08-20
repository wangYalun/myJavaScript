
/**
 * JavaScript标准参考教程
 */

/**
 * Object 对象
 */
(function () {
    Object.prototype.print = function () {
        console.log(this.toString());
    }
    var a = { name: 'allen' };
    a.print();
    console.log(typeof Object);

    var obj = Object();

    console.log(obj);

    Object.getOwnPropertyNames(a);

    Object.keys(a);

    console.log(Object.getPrototypeOf(a));
});
/**
 * 二进制数组
 */
(function () {

    var buf = new ArrayBuffer(32);//申请一个32字节的内存。

    var dataView = new DataView(buf);// 用DataView 操作内存

    console.log(dataView.getFloat64(24));// Float64 需要8个字节，这个内存总共有32个字节，从第24个字节开始最后。

    console.log(dataView.getInt8(31));


    var buf2 = new ArrayBuffer(12);//申请一个12字节的内存

    var x1 = new Int32Array(buf2);

    x1[0] = 10000;
    x1[2] = 10000;

    var d1 = new DataView(buf2);

    console.log(d1.getInt32(8, true));//默认大端字节序，如果要小端字节序的话，需加上true

    d1.setInt32(4, 20000, true);//以小段

    d1.setInt32(4, -2000, true);
    //d1.setInt32(5,-2000,true);

    ArrayBuffer.isView(d1);

    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    console.log(typeof ab2str(buf2));




    console.log(x1);


    var isLittleEndian = (function () {
        var buffer = new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, 256, true);
        return new Int16Array(buffer)[0] === 256;
    })();

    console.log(isLittleEndian);

    /**
     * 二进制数据的应用
     */

    /**
     * 1.Ajax
     * 2.Canvas
     * 3.WebSocket
     * 4.Fetch API
     * 5.File API
     */

});
/**
 * 属性描述对象
 */
(function () {
    'use strict'
    var obj = { a: "allen", b: "bob" };

    Object.defineProperty(obj, 'c', { enumerable: false, value: "cici", writable: false, configurable: false });
    console.log(Object.getOwnPropertyDescriptor(obj, "a"));//Object.getOwnPropertyDescriptor 获取属性描述对象，只能用于对象自身的属性，不用用于继承的属性（Own)

    console.log(Object.getOwnPropertyNames(obj));//['a','b','c']，返回一个数组

    console.log(Object.keys(obj));//['a','b'];//只返回可以枚举的属性

    //obj.c = "CICI";


    console.log(obj.propertyIsEnumerable("toString"));
    console.log(obj.propertyIsEnumerable("a"));

    var obj2 = {
        get p() {
            return "p";
        },
        set p(value) {
            console.log("setter:" + value);
        }
    }
    console.log(obj2.p);
    obj2.p = "pp";

    Object.freeze(obj2);//阻止对象新增，删除和修改属性的值

    Object.seal(obj2);//阻止对象新增和删除属性

    Object.preventExtensions(obj2);//阻止对象添加新的属性

});

/**
 * Date 对象
 */
(function () {
    Date();//直接调用，返回当前时间字符串。
    Date(2000, 1, 20);//返回当前时间字符串，和传参数无关
});

/**
 * RegExp对象
 */
(function () {
    var r = /abc/g;

    r.ignoreCase;
    r.multiline;
    r.global

    console.log(r.source);

    console.log(r.exec("_abc.abc.fasabc"));

    console.log("_abc.abc.fasabc".match(r));

    console.log("_abc".replace(r, '[$&]'));//$& 匹配的子字符串

    /**
     * $& 匹配的子字符串
     * $` 匹配结果的前面的文本
     * $' 匹配结果的后面的文本
     * $n 匹配成功的第n组内容
     */

    console.log("abc".replace("b", "[$`-$&-$']"));

    console.log("Hello World".replace(/\w+/g, (function (match) {
        //console.log(match);
        var i = 0;
        return function (_match) {
            console.log(i + ":" + match);
            i++;
            return _match.toUpperCase();
        }
    })()));

    console.log("this is a jiandan de xiaoqingge.\nchang zhe women xinzhong de baige".match(/\b\w+\b/g));


    console.log("https://allen.abbbbbc.com?name=allen".match(/^http(s)?\:\/\/([^\/\r\n]+)(\/[^\r\n]*)?$/));




})();

