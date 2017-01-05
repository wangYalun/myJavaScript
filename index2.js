/**
 * JavaScript 权威指南 学习笔记 代码实践
 */

/**
 * 第四章 表达式和运算符
 */

(function () {
    //"use strict"
    //严格模式下，this 不指向全局对象
    if (this === (global)) {
        console.log('true');
    }

    //对象创建表达式
    new Object();

    //如果参数不需要传入任何参数，空圆括号可以省略
    new Object;


    function O() {
        this.name = 'allen';
        //如果一个构造函数确实返回了一个对象值，那么这个对象就作为整个对象创建表达式的值;
        return {};
    }
    var o = new O();
    console.log(o.name);//undefined

    console.log("123" < "22"); //true,优先以字符串方式比较

    var a, b, c, d;
    a = b = c = d = 1;

    console.log((b++) + c * b);
    //除+号玩，*, / , % , - 等算术运算符会将无法转换为数字的操作数都转换为NaN值，运算结果也是NaN
    console.log("fasd" * 2);// NaN

    //在JavaScript中，所有的数字都是浮点型的，除法运算的结果也是浮点型

    //+,加号的转换规则优先考虑字符串连接
    console.log(2 + "2");

    a = a + 1;
    ++a;
    //++a并不总和a=a+1 完全一样,"++" 运算符从不进行字符串连接操作，它总会将操作数转换为数字并增加1

    console.log(!new Boolean('false'));

    //比较运算符，数值大小或者字母表的顺序

    //比较操作符的操作数可能是任意类型，然而，只有数字和字符串才能真正的执行比较操作；
    //对于数字和字符串操作符来说，加号运算符和比较运算符的行为都有所不同。
    //只有两个都是字符串时，才会进行字符串的比较
    "11" < 3;//数字比较，将“11”转化成数字
    "one" < 3;// 数字比较，将"one"转化成数字，为NaN，结果为false

    //带操作的赋值运算
    a += b;
    //等价于
    a = a + b;

    typeof Array;//function
    typeof 123;//number
    //函数是对象的一种
    //函数和“可执行对象”有着细微的差别
});

/**
 * 第五章 语句
 */
(function () {
    var n = 1;
    switch (n) {
        case 1:
            console.log(1);
            break;
        case 2:
            console.log(2);
            break;
        default:
            console.log("default");
    }

    var o;
    //o.a.a;//会中断代码

    try {
        o.a.a;
        throw new Error('fasdfasd');
    } catch (e) {
        //不会中断代码
        console.log(e);
    }
    finally {
        console.log('finally');
    }

    var o = { a: 'allen', b: 20 };
    var x = 1;
    with (o) {
        x = 2;// 
    }
    console.log(x);//2
    //with语句提供了一种读取o 的属性的快捷方式，但它并不能创建o的属性；

    function f(o) {
        if (o === undefined) debugger;
        console.log('fasd');
    }
});


/**
 * 第六章 对象
 */

(function () {
    function O() {

    }
    console.log(Object.prototype.toString.call(O));

    /**
     * 三类JavaScript 对象
     * 1. 内置对象(native object) ，数组，函数，日期和正则表达式
     * 2. 宿主对象(host object)
     * 3. 自定义对象(user-defined object)
     * 
     * 二类属性
     * 1. 自由属性
     * 2. 继承属性
     */

    /**
     * 创建对象
     */
    //对象直接量
    var o = {};

    var o = new Object();
    //o.toString();
    //var o=Object.create();//报错,Object prototype may only be an Object or null;
    o.toString();
    var o = Object.create(Object.prototype);

    //var o=Object.create(null); //o不继承任何属性和方法

    function Person() {

    }
    var person = new Person();
    console.log(Object.prototype.toString.call(person));

    function Student() {

    }

    //o.hasOwnProperty("x");

    //对象序列化
    var o = { a: "allen", b: 20 };
    var jsonStr = JSON.stringify(o);
    try {
        o = JSON.parse(jsonStr + 'fasdf');
        //var jsonStr=JSON.stringify(o);
    } catch (e) {
        console.log(e);
    }
});

/**
 * 第7章 数组 
 */

(function () {
    var a = [1, undefined, 3];
    //delete a[0];
    //delete 操作不会改变length的值,变成稀疏数组
    //删除数组元素，调用splice方法
    //slice 截取
    a.splice(1, 1, 2);
    console.log(a.length);//3
    console.log("0" in a);//false
    console.log("1" in a);//true

    for (var i in a) {
        console.log(i + ":" + a[i]);
    }
    //稀疏数组
    var b = new Array(10);
    b[1] = 10;
    b.forEach(function () {
        console.log("fasd");
    });
    var b = b.map(function (value) {
        return value * 10;
    });
    console.log(b);

    //用filter 压缩稀疏数组
    var b = b.filter(function () {
        return true;
    });
    console.log(b);
    //every,some
    var booleanValue = b.every(function (x) {
        return x > 10;
    });
    console.log(booleanValue);

    //reduce
    var c = [1, 2, 3, 4, 5];

    //数组求和
    c.reduce(function (x, y) {
        console.log(y);
        return x + y;
    });

    //求数组最大值
    c.reduce(function (x, y) {
        return x > y ? x : y;
    });
    console.log('---');
    c.reduceRight(function (x, y) {
        console.log(x);
        return x + y;
    });

    function findall(a, x) {
        console.log(Array.isArray(arguments));
        var result = [];
        var len = a.length;
        var pos = 0;
        while (pos < len) {
            pos = a.indexOf(x, pos);
            if (pos == -1) {
                break;
            }
            result.push(pos);
            pos = pos + 1;
        }
        return result;
    }

    var str = "9999989";

    console.log(findall(str, "9"));

    //类数组对象
    var arrayLike = { "0": "a", "1": "b", length: 2 };

    function isArrayLike(o) {

    }
    //作为数组的字符串
    var s = "JavaScript";

    console.log([].join.call(s, " "));
    console.log([].join.call(arrayLike, "+"));




});

/**
 * 第八章 函数
 */

(function () {
    //方法链
    var o = {};
    o.invokeTimes = 0;
    o.f = function () {
        console.log(++this.invokeTimes);
        return this;
    }

    o.f().f().f();

    //call()和apply()可以用来间接的调用函数
    //任何函数可以作为任何对象的方法来调用
    function theCall() {
        console.log(++this.invokeTimes);
    }
    //可用作对象私有方法
    theCall.call(o);

    //函数式编程
    //高阶函数，即操作函数的函数；
    //例如
    function not(f) {
        return function () {
            var result = f.apply(this, arguments);
            return !result;
        }
    }

    //将类数组对象转化为真正的数组
    function arrayLikeToArray(a, n) {
        return [].slice.call(a, n || 0);
    }

    //高阶函数-记忆
    function memorize(f) {
        var cache = {};
        return function () {
            var key = arguments.length + [].join.call(arguments, ",");
           
            if (key in cache) {
                return cache[key];
            } else {
                return cache[key] = f.apply(this, arguments);
            }
        }
    }

    var fibonacci=memorize(function(n) {
        if (n <= 2) {
            return 1;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    });

    function factorial(n){
        return n<=1?1:n*factorial(n-1);
    }



    //测试代码
    var testFun=fibonacci;//测试方法
    var testNum=45;//测试数字

    var startTime=+new Date();
    console.log(testFun(testNum));
    var endTime=+new Date();
    console.log(endTime-startTime);

    var testFun=memorize(testFun);
    console.log("----利用高阶函数-记忆----");
     var startTime=+new Date();
    console.log(testFun(testNum));
    var endTime=+new Date();
    console.log(endTime-startTime);

})();