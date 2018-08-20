/**
 * JavaScript 权威指南 学习笔记 代码实践
 */
/**
 * 第一章 JavaScript概述
 * 描述网页内容的HTML，描述网页样式的CSS，描述网页行为的JavaScript
 */
/**
 * 第二章 词法结构
 */

/**
 * 第三章 类型，值和变量
 */
(function () {
    Math.abs(-10);//10
    Math.floor(0.1);//0
    Math.ceil(0.1);//1
    Math.pow(2, 10);//2^10
    Math.random();

    console.log(Number.MAX_VALUE + 2);
    console.log(Number.MAX_VALUE + 1);
    console.log(Infinity);
    console.assert(isNaN(0 / 0));

    console.log(-0 === 0);

    var str = "allen\
    name\
    haha\
    fasdfas\
    "; //在ES5中，可以用反斜杠来表示多行字符串
    console.log(str);
    "\n \r \v \f ";

    console.log(+[])

});



/**
 * 第四章 表达式和运算符
 */

(function () {

    //4.7.7
    var a = 10;
    var b;
    function log(a) {
        console.log(a);
        return 10;
    }
    // log("a") = log("b");//报错,其实首先还是先计算log("a")，从左往右的执行顺序不变

    // (a + a) = log("10");//报错

    b = (a++) + a;// 1.计算b,2.计算a++，返回值为c,3.计算a,4. 计算c+a,5. 将c+a的结果赋值给b

    console.log(b);

    console.log(6.5 % 2.1)//0.2，最好不要对浮点数取模



    var z, x;

    console.log(z === x);

    ("Zoo" > "aardvark")//false
    //所有的大写ASCII字母都“小于”小写的ASCII字母。

    /**
     * 第二次阅读笔记 2018.7.2
     */
    1 + 1;
    1 + "2";
    "1" + 2;
    11 < 3;//false
    "11" < "3"; //字符串的比较
    "11" < 3;//数字的比较
    11 < "3";//数据的比较

    "one" < 3;//数字的比较，one将转换为NaN 

    //逻辑与&&
    /**
     * 逻辑与&&,并不是总是返回 true 或者 false ，实际上，当左操作数为假值时，直接返回 左操作数，如果左操作数为真值，才会去计算 右操作数，并直接返回右操作数。
     * a&&a.x ，当a是真值时，才会计算 a.x 的值
     */
    /**
     * 逻辑或||
     * 当左操作符是真值时，直接返回 左操作符 的值，当左操作符为假值时，才会去计算右操作符的值，并直接返回。
     */



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

    // "use strict"
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

    //抛出异常 
    /**
     * 当抛出异常时，JavaScript 解析器会立即停止当前正在执行的逻辑，并跳转至就近的异常处理程序。异常处理程序是try/catch/finally 语句中的catch 从句编写的
     * 如果抛出的异常的代码块没有一条相关联的catch 从句，解析器会检查更高层的闭合代码块，看它是否有相关联的异常处理程序。
     */

    var fn = (function () {

        throw new TypeError('type is error');

    });

    try {
        fn();
    } catch (error) {
        //console.log(error);
    }

    var j = 0;
    while (j < 10) {
        try {
            if (true) {
                //throw new Error("Error");
            }
            continue;
        } finally {
            console.log("j");
            j++;
        }
    }

    for (var i = 0; i < 10; i++) {

        if (i === 5) {
            continue;
        }
    }




    try {
        o.a.a;
        throw new Error('fasdfasd');
    } catch (e) {
        //不会中断代码
        console.log(e);
    } finally {
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
    f();



    var z = { a: 0 };
    Object.freeze(z);
    z.b = 0;

    var hasStrictMode = (function () { "use strict"; return this === void 0 }());

    console.log(hasStrictMode);

    //use strict
    (function () {
        "use strict";
        (function () {
            console.log(typeof this);
            //在严格模式下，当通过call和apply来调用函数时，其中this 的值就是通过call或者apply传入的第一个参数。
            //在非严格模式下，null 和undefined 会被转化未全局对象，非对象值会转换未对象值
        }).call(10);

        (function (name1, name2) {
            console.log(arguments);
            arguments[0] = "bob";
            arguments[1].name = "bob";
            console.log(arguments);
            console.log(name1);//allen
            console.log(name2);//{name:"bob"}
            //在严格模式下，函数里的arguments对象用户传入函数值的静态副本。
            //在非严格模式下，arguments 里的数组元素和函数参数都是指向同一个值的引用。
        })("allen", { name: "allen" })
        var name = "allen";
        var nameObj = { name: "allen", name: "bob" };

        var name = "bob";

        // delete nameObj.name;

    })();

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
    /**
     * Object.create 其中的一个用途就是防止库函数无意间（无恶意地）修改那些不受你控制的对象。
     * 不是将对象直接作为参数传入函数，而是将他的继承对象传入函数。 
     * 当函数读取继承对象时，实际上读取的是继承来的值。如果给继承对象的属性赋值，则这些属性只会影响到这个继承对象自身，而不是原始对象。
     */

    /**
     * 关联数组（associative arry），也称作散列，映射或字典（dictionary）。JavaScript对象都是关联数组。
     */
    var _obj = {
        _name: "allen",
        get name() {
            return this._name;
        },
        set name(name) {
            this._name = name;
        }

    }

    var p = Object.create(_obj);
    p.name = "bob";
    console.log(p.name);
    console.log(p._name);
    console.log(_obj.name);

    delete Object.prototype;

    console.log(p.hasOwnProperty("_name"));

    console.log(p.propertyIsEnumerable("name"));

    for (var i in p) {
        if (!p.hasOwnProperty(i)) { continue; }
    }
    /**
     * 把source 中的属性复制到target中，
     * 如果target 和source 有同名属性，则覆盖target中的属性
     * 这个函数不处理getter和setter以及复制属性
     */
    function extend(target, source) {
        for (var i in source) {
            target[i] = source[i];
        }
        return target;
    }

    /**
     * 将source 可枚举的属性复制到target中，
     * 如果target和source存在相同的属性，o中的属性将不受影响
     */
    function merge(target, source) {
        for (var i in source) {
            if (target.hasOwnProperty[i]) { continue; }
            target[i] = source[i];
        }
        return target;
    }
    /**
     * 如果target中的属性在source中没有，则删除这个属性
     */
    function restrict(target, source) {
        for (var i in target) {
            if (!(i in source)) {
                delete target[i];
            }
        }
        return target;
    }
    /**
     * 如果target中的属性在source中存在同名属性，则从target中删除这个属性
     */

    function subtract(target, source) {
        for (var i in target) {
            if (i in source) {
                delete target[i];
            }
        }
        return target;
    }

    /**
     * 返回一个新对象，这个对象同时拥有target和p的属性
     * 如果target和source存在同名属性，则使用source中的属性
     */
    function union(target, source) {
        return extend(extend({}, target), source)
    }

    /**
     * 返回一个新对象，这个对象同时拥有target和source的属性
     */
    function intersection(target, source) {
        return restrict(extend({}, target), source);
    }
    /**
     * 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字，相当于Object.keys
     */
    function keys(obj) {
        if (typeof obj != 'object' || typeof obj != 'function') throw new TypeError();
        var result = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                result.push(i);
            }
        }
        return result;
    }
    //Object.getOwnPropertyNames和Object.keys的区别，getOwnPropertyNames 不可枚举的也会有。
    console.log(Object.getOwnPropertyNames(p));

    /**
     * getter 和 setter
     */
    var o = {
        _name: "allen",
        get name() {
            return this._name;
        },
        set namea(name) {
            this._name = name;
        }
    }
    o.name = "bob";

    var random = {
        get octet() {
            return Math.floor(Math.random() * 256);
        },
        get uint16() {
            return Math.floor(Math.random() * 65536);
        }
    }
    console.log(Object.getOwnPropertyDescriptor(random, 'octet'));
    console.log(Object.keys(random));

    Object.defineProperty(o, "_age", { value: 20, writable: true, configurable: true, enumerable: true });

    Object.defineProperty(o, "age", {
        get: function () {
            return this._age;
        }, configurable: true, enumerable: true
    });

    console.log(Object.getPrototypeOf(p));

    // console.log(p.isPrototypeOf(_obj));
    console.log(_obj.isPrototypeOf(p))

    console.log(p.__proto__);

    /**
     * classof 函数
     */
    function classof(o) {
        if (o === null) return 'Null'
        if (o === undefined) return 'Undefined'
        return Object.prototype.toString.call(o).slice(8, -1);
    }
    console.log("Allen");
    console.log(classof([]));

    console.log(Object.isExtensible(o));

    Object.preventExtensions(o);

    console.log(Object.isExtensible(o));

    Object.seal(o);

    //创建一个封闭对象，包括一个冻结的原型和一个不可枚举的属性
    var q = Object.seal(Object.create(Object.freeze({ x: 1 }), { y: { value: 2, writable: true } }));

    console.log(q.x, q.y);
    q.x = 3;
    q.y = 4;
    console.log(q.x, q.y);



    //console.log(p.constructor.prototype)

    console.log(Object.keys(o));

    console.log(o.name);

    /**
     * 改进版 extend
     */
    function extendPro(target, source) {
        //得到所有的自由属性，包括不可枚举的属性
        var names = Object.getOwnPropertyNames(source);
        //遍历它们
        for (var i = 0, len = names.length; i < len; i++) {
            //如果属性已经存在，则跳过
            if (names[i] in target) { continue }
            var desc = Object.getOwnPropertyDescriptor(source, names[i]);
            Object.defineProperty(target, names[i], desc);
        }
    }



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
        //console.log(e);
    }
});

/**
 * 第7章 数组 
 */

(function () {
    var a = [1, undefined, 3];
    delete a[0];
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


    /**
     * 利用闭包实现私有属性存取器方法
     */
    function addPrivateProperty(o, name, predicate) {
        var value;

        o['get' + name] = function () {
            return value;
        }
        o['set' + name] = function (v) {
            if (predicate && !predicate(v)) {
                throw Error("set " + name + "invalid value " + v)
            } else {
                value = v;
            }
        }
    }

    addPrivateProperty(o,"Name");

    o.setName("Allen");
    console.log(o.getName());

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

    var fibonacci = memorize(function (n) {
        if (n <= 2) {
            return 1;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    });

    function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }



    //测试代码
    var testFun = fibonacci;//测试方法
    var testNum = 45;//测试数字

    var startTime = +new Date();
    console.log(testFun(testNum));
    var endTime = +new Date();
    console.log(endTime - startTime);

    var testFun = memorize(testFun);
    console.log("----利用高阶函数-记忆----");
    var startTime = +new Date();
    console.log(testFun(testNum));
    var endTime = +new Date();
    console.log(endTime - startTime);

})();



/**
 * 第九章 类和模块 
 */

(function () {

    //继承对象原型方法
    function inherit(prototypeObject) {
        if (prototypeObject == null) {
            throw new TypeError("can not be null");
        }
        if (Object.create) {
            return Object.create(prototypeObject);
        }
        var t = typeof prototypeObject;
        if (t !== 'object' && t !== 'function') {
            throw new TypeError();
        }
        function f() { }
        f.prototype = prototypeObject;
        return new f();
    }
    /**
     * 创建类
     */
    //工厂方法
    function createPerson(name) {
        var person = inherit(createPerson.methods);
        person.name = name;
        return person;
    }

    createPerson.methods = {
        sayName: function () {
            console.log(this.name);
        }
    }
    var person = createPerson("allen");
    person.sayName();

    //构造函数
    function Person(name) {
        this.name = name;
    }

    Person.prototype.sayName = function () {
        console.log(this.name);
    }

    var person2 = new Person("allen2");
    person2.sayName();

    console.log(person2.constructor.name);

    /**
     * 可以判断值得类型type() 函数
     */
    function type(o) {
        var t, c, n;//type,class,name;

        //处理null值的特殊情况
        if (o === null) {
            return "null";
        }

        if (o !== o) {
            return "NaN";
        }

        //如果typeof 的值不是"object"，则使用这个值
        //这可以识别出原始值的类型和函数
        if ((t = typeof o) !== "object") {
            return t;
        }
    }

    function classof() {
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    /**
     * 鸭式辩型
     * 不要关注“对象的类是什么”，而是要关注“对象能做什么”
     * “像鸭子一样走路，游泳并且嘎嘎嘎叫的鸟就叫鸭子”---James Whitcomb Riley
     */

    /**
     * 利用鸭式辩型实现的函数
     * 如果o实现了除第一个参数之外的参数所表示的方法，则返回true
    */
    function quacks(o/*,...*/) {
        for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];
            switch (typeof arg) {
                case 'string':
                    if (typeof o[org] !== 'function') return false;
                    continue;
                case 'function':
                    arg = arg.prototype;
                case 'object':
                    for (var m in arg) {
                        if (typeof arg[m] !== 'function') continue;
                        if (typeof a[m] !== 'function') { return false };
                    }
            }
        }
        return true;
    }


    /**
     * 集合类 Set,非重复值，无序
     */
    function Set() {
        this.values = {};
        this.n = 0;
        this.add.apply(this, arguments);
    }

    Set.prototype.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            var val = arguments[i];
            var str = Set._v2s(val);
            if (!this.values.hasOwnProperty(str)) {
                this.values[str] = val;
                this.n++;
            }
        }
        return this; //支持链式调用
    };

    Set.prototype.remove = function () {
        for (var i = 0; i < arguments.length; i++) {
            var str = Set._v2s(arguments[i]);
            if (this.values.hasOwnProperty(str)) {
                delete this.values[str];
                this.n--;
            }
        }
        return this;
    };

    Set.prototype.contains = function (value) {
        return this.values.hasOwnProperty(Set._v2s(value));
    };

    Set.prototype.size = function () {
        return this.n;
    };

    Set.prototype.foreach = function (f, context) {
        for (var s in this.values) {
            if (this.values.hasOwnProperty(s)) {
                f.call(context, this.values[s]);
            }
        }
    }

    Set._v2s = function (val) {
        switch (val) {
            case undefined: return 'u';
            case null: return 'n';
            case true: return 't';
            case false: return 'f';
            default:
                switch (typeof val) {
                    case 'number': return '#' + val;
                    case 'string': return '"' + value;
                    default: return '@' + objectId(val);
                }
        }

        function objectId(o) {
            var prop = "|**objectid**|";
            if (!o.hasOwnProperty(prop)) {
                o[prop] = Set._v2s.next++;
            }
            return o[prop];
        }
    };

    Set._v2s.next = 100; //初始值ID的值

    /**
     * 枚举类型 enumerated type,值得有限集合
     */

    /**
     * 创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
     * 返回一个构造函数,它标识这个新类
     */

    function enumeration(namesToValues) {
        var enumeration = function () {
            throw "Can\'t Instantiate Enumerations";
        };

        //枚举值继承这个对象
        var proto = enumeration.prototype = {
            constructor: enumeration,
            toString: function () {
                return this.name;
            },
            valueOf: function () {
                return this.value;
            },
            toJSON: function () {
                return this.name;
            }
        };

        enumeration.values = [];

        for (var name in namesToValues) {
            var e = inherit(proto);
            e.name = name;
            e.value = namesToValues[name];
            enumeration[name] = e;
            enumeration.values.push(e);
        }

        enumeration.foreach = function (f, c) {
            for (var i = 0; i < this.values.length; i++) {
                f.call(c, this.values[i]);
            }
        }

        return enumeration;
    }


    var Coin = enumeration({ Allen: 1, Bob: 2 });

    var allen = Coin.Allen;

    console.log(allen instanceof Coin);

    /**
     * 用枚举类型表示一副扑克牌
     */

    //定义一个表示“玩牌”的类
    function Card(suit, rank) {
        this.suit = suit;//表示花色
        this.rank = rank;//表示点数
    }

    Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 });
    Card.Rank = enumeration({ Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14 });

    Card.prototype.toString = function () {
        return this.rank.toString() + " of " + this.suit.toString();
    }

    Card.prototype.compareTo = function (that) {
        if (this.rank < that.rank) return -1;
        if (this.rank > that.rank) return 1;
        return 0;
    }
    //以扑克牌的玩法规则对牌进行排序的函数
    Card.orderByRank = function (a, b) {
        return a.compareTo(b);
    }
    //以桥牌的玩法规则对扑克牌进行排序的函数
    Card.orderBySuit = function (a, b) {
        if (a.suit < b.suit) return -1;
        if (a.suit > b.suit) return 1;
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;
        return 0;
    }


    //定义用以表示一副标准扑克牌的类
    function Deck() {
        var cards = this.cards = [];
        Card.Suit.foreach(function (s) {
            Card.Rank.foreach(function (r) {
                cards.push(new Card(s, r));
            })
        })
    }

    Deck.prototype.shuffle = function () {
        var deck = this.cards, len = deck.length;
        for (var i = len - 1; i > 0; i--) {
            var r = Math.floor(Math.random() * (i + 1)), temp;
            temp = deck[i], deck[i] = deck[r], deck[r] = temp;
        }
        return this;
    }

    Deck.prototype.deal = function (n) {
        if (this.cards.length < n) {
            throw "Out of cards";
        }
        return this.cards.splice(this.cards.length - n, n);
    }

    //创建一幅新扑克牌，洗牌并发牌
    var deck = (new Deck()).shuffle();

    var hand = deck.deal(13).sort(Card.orderBySuit);

    console.log(hand.length);

    /**
     * 子类
     */

    /**
     * 将对象的指定名字（或所有）的属性设置为不可写的和不可配置的
     */
    function freezeProps(o) {
        var props = (arguments.length === 1) ? Object.getOwnPropertyNames(o) : [].splice.call(arguments, 1);
        props.forEach(function (n) {
            //忽略不可变的属性
            if (!Object.getOwnPropertyDescriptor(o, n).configurable) return;
            Object.defineProperty(o, n, { writable: false, configurable: false });
        });
        return o;
    }

    //测试代码

    var o = { name: "allen", age: 20 };
    freezeProps(o, "name");
    o.name = "bob";
    Object.defineProperty(o, "age", { value: 22 });
    console.log(o.name);
    console.log(o.age);

    //将o的指定名字（或所有）的属性设置为不可枚举和可配置的

    function hideProps(o) {
        var props = (arguments.length === 1) ? Object.getOwnPropertyNames(o) : [].splice.call(arguments, 1);
        props.forEach(function (n) {
            if (!Object.getOwnPropertyDescriptor(o, n).configurable) {
                return;
            }
            Object.defineProperty(o, n, { enumerable: false });
        });
    }

    //定义不可枚举的属性
    (function () {
        //定义一个不可枚举的属性objectId,它可以被所有对象继承
        //当读取这个属性时，调用getter 函数
        //它没有定义setter,因此它是只读的
        //它是不可配置的，因此它是不能删除的
        Object.defineProperty(Object.prototype, "objectId", {
            get: idGetter,
            enumerable: false,
            configurable: false
        });

        function idGetter() {
            if (!(idprop in this)) {
                if (!Object.isExtensible(this)) {
                    throw Error("can\'t define id for nonextensible objects");
                }
                Object.defineProperty(this, idprop, {
                    value: nextid++,
                    writable: false,
                    enumerable: false,
                    configurable: false
                });
            }
            return this[idprop];
        }
        var idprop = "|**objectId**|";
        var nextid = 1;//给它设置初始值
    })();

    //测试代码
    //定义过的代码，不能再定义了
    //阻止对Object.prototype 进行扩展
    //Object.seal(Object.prototype);

    var o = { name: "allen" };
    Object.seal(o);
    console.log(Object.isSealed(o));
    o.age = 20;
    console.log(o.age);

    Object.freeze(o);
    var a = Object.create(o);
    a.name = "allenfasd";

    console.log(a.name);

    /**
     * 模块
     */

    //导出模块

    var Set = (function () {
        //私有方法
        function _v2s() {
            /** */
        }

        function Set() {

        }

        Set.prototype.add = function () {
            console.log("this is add");
        }

        /** */

        return Set;
    })();



    //模块
    //
    (function () {
        var model = {};
        model.collections = {};
        Object.defineProperty(model, "exports", {
            set: function (v) {
                this.collections[v["name"]] = v["value"];
            },
            configurable: false,
            enumerable: false,
        });

        function require2(name) {
            return model.collections[name];
        }
        var window = window || global;
        window.model = model;
        window.require2 = require2;
    })();

    model.exports = { name: "set", value: Set };


    var Set = require2("set");
    var set = new Set();
    set.add();
});

/**
 * 第十一章 正则表达式的模式匹配
 */
(function () {
    //直接量
    var pattern = /s$/;

    var patternObject = new RegExp("\\w+");
    var p = [];



    p.push(/abc\o\n/);//匹配 直接字符量，字符和数据本身, \o NUL字符, \t 制表符 \n 换行符 \v 垂直制表符  \f 换页符 \r 回车符 \xnn 
    p.push(/\d+/); //匹配包含 一个或多个数字的所以字符
    /**
     * [...] 方括号内的任意字符
     * [^...] 不在方括号的任意字符
     * . 除换行符和其他Unicode行终止符之外的任意字符
     * \w 任何ASCII字符组成的单词，等价于[a-zA-Z0-9]
     * \W 任何不是ASCII字符组成的单词，等价于[^a-zA-Z0-9]
     * \s 任何Unicode空白符
     * \S 任何非Unicode空白符的字符
     * \d 任何ASCII数字，等价于[0-9]
     * \D 除了ASCII数字之外的任何字符，等价于[^0-9]
     * [\b] 退格直接量
     */
    /**
     * 10.1.3 重复
     * {n,m} 匹配前一项至少n次，但不能多于m次
     * {n,} 匹配前一项n次，或更多次
     * {n} 匹配前一项n次
     * ? 匹配前一次0次或者1次
     * + 匹配前一项1次或者多次
     * * 匹配前一项0次或者多次
     */
    p.push(/\d{1,2}/);//匹配包含由一个到两个数字的字符串
    p.push(/a+/);//贪婪匹配，尽可能的多匹配更多的a，例如 当用 aaa 进行匹配时，会匹配它的三个字符
    p.push(/a+?/);//非贪婪匹配，尽可能的少匹配，例如 当用 aaa 进行匹配时，会匹配它的一个字符a, /a+?b/ 等价于 /a+b/
    /**
     * 10.1.4 选择，分组和引用
     * | 选择，匹配的是该选择符左边的子表达式或右边的子表达式
     * (...) 组合，将几个项组合为一个单元，这个单元可通过 "*" ,"+","?" 等符号加以修饰，并且可以引用
     * (?:...) 只组合，不记忆，无法引用
     * \n 和第n个分组第一次匹配的字符相匹配
     */
    p.push(/ab|acd/gi);//选择,选择项的尝试匹配次序是从左到右，直到发现了匹配项
    p.push(/java(script)?/);//组合，匹配 java 或 javascript 
    p.push(/(['"])[^'"]*\1/);//引用， 匹配单引号或双引号里的内容
    /**
     * 10.1.5 指定匹配的位置
     * ^ 匹配字符串的开头, 在多行检索中，匹配一行的开头
     * $ 匹配字符串的结尾，在多行检索中，匹配一行的结尾
     * \b 匹配单词的边界
     * \B 匹配非单词边界的位置
     * (?=p) 要求接下来的字符都与p匹配，但不能包括匹配p的那些字符
     * (?!=p) 要求接下来的字符不与p匹配
     */
    p.push(/\b[Jj]ava([Sscript])?\b/);//单词的边界\b
    p.push(/javascript(?=\:)/); //匹配javascript后面带有冒号的javascript
    p.push()
    p.push(/^JavaScript$/);
    console.log(Object.prototype.toString.call(pattern).slice(8, -1));
    /**
     * 10.2 用于模式匹配的String方法
     * String 支持4种使用正则表达式的方法
     */

    var i = "JAvaScript".search(/[^abc]/);//当参数是正则对象时,search 忽略g 全局属性，返回第一个与之匹配的子串的位置
    console.log("question 1:", i);//0 

    i = "allen,bob".search('allen');//当参数是字符串时，会将参数转化为 new RegExp('allen')

    var text = '"This is a     text~"';
    //text.replace(/"([^"]*)"/,'“$1”');
    console.log("question 2:", text.replace(/"([^"]*)"/, '“$1”')); // 将替换双引号
    i = "allen,bob".replace(/a(?:llen)\,/, '"a$1"');

    console.log("question 3", text.match(/\b\w+\b/g));// 将所有单词匹配出来，返回一个数组

    console.log("fas0001000,000fas".replace(/[^1-9]*([1-9][\d]*)[^\d]*/, "$1"));
    console.log("fasdf$12319098098~fsdf".match(/[\$￥][1-9][0-9]*[.,]*[0-9]*(?=~)/g));

    console.log(/[1-9][0-9]*[.,]*[0-9]*/.exec('fasdfa2342,2342adsf'));

    console.log("question 4", text.split(/\s+/));
    /**
     * 10.3 RegExp 对象
     */
    i = /^0?\d{11}$/.test("018600699358");
    console.log("question 5", i);
    i = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/.test("18942339954");
    i = /^[\w]+([-+.]\w+)*@\w+([-.]\w+)*$/.test("326402399+allen.wang@qq.com");
    //i=/[\w]+/.test("326402399");
    //i="18600699358".search(/\d{11}/);
    //i="1,2,3,4".match(/(?:\w)+/);

    console.log(i);

});

/**
 * 第二部分 客户端JavaScript 
 */
