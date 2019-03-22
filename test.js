// var classnames = require('classnames');

(function () {

    function f() {
        console.log(this === global);
    }

    var o = { name: "allen" }
    var b = { name: "allen" }

    f.call(undefined);

    var Set = function () {

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

    console.log(Set._v2s(o));
    console.log(Set._v2s(b));
    console.log(o);
});
//2017-01-10
(function () {

    function Person() {

    }


    (function () {
        var nextid = 1;
        var idprop = "|personid|";

        Object.defineProperty(Person.prototype, "personId", {
            get: function () {
                if (!(idprop in this)) {
                    if (!Object.isExtensible(this)) {
                        throw Error("can\'t define id for nonextensible objects");
                    }
                    console.log("第一次获取personID");
                    Object.defineProperty(this, idprop, {
                        value: nextid++,
                        enumerable: false,
                        writable: false,
                        configurable: false
                    });
                }
                return this[idprop];
            },
            enumerable: false,
            configurable: false
        });
    })();




});

(function () {
    var s = setTimeout(function () {
        console.log('llll');
    }, 5000);
    clearTimeout(s);
});

/**
 * Array
 */
(function () {
    var a = [];

    a.push('allen', 'bob');
    console.log(a);
    a.push('cici');
    // console.log(a);
    // console.log(a.pop());

    // a.unshift('di');
    // console.log(a);
    // console.log(a.shift());
    // console.log(a);
    console.log(a.reverse());
    console.log(a);
    console.log(a.splice(0, 1));//返回删除的数组
    console.log(a.splice(0, 0, 'allen', 'bobo'));
    console.log(a);
    console.log(a.slice(0, 1));

    a.every(function (item, index, array) {

    });
    // a.filter(); //return Array
    // a.some(); //return boolean
    // a.map();// return Array
    // a.forEach(function (item, index, array) {

    // });
    var str = a.reduce(function (prev, cur, index, array) {
        return prev + "," + cur;
    });
    console.log(str);
    console.log(str);
    function foo(fn) {
        return function () {
            fn.apply(this, arguments);//this 指向 windows 
        }
    }

});
/**
 * Date
 */
(function () {
    var date = new Date();
    Date.parse(date);// 返回date的毫秒数
    Date.UTC(2017, 3); //年月
    Date.now();//毫秒数
    +new Date();//毫秒数
});
/**
 * 私有变量
 */
(function () {
    //私有变量
    function Person() {

        var _num = 0;//私有变量

        this.getNum = function () {
            return _num;
        };
        this.setNum = function (num) {
            _num = num;
        }
    }
    //
    var person = new Person();
    console.log(person.getNum());
    person.setNum(10)
    console.log(person.getNum());

    //静态私有变量

    (function () {
        var _name = "allen";

        function StaticPerson() {

        };

        StaticPerson.prototype.getName = function () {
            return _name;
        };
        StaticPerson.prototype.setName = function (name) {
            _name = name;
        };

        Person.Person = StaticPerson;
    })();

    var person1 = new Person.Person();
    var person2 = new Person.Person();
    console.log(person1.getName());
    person2.setName("bob");
    console.log(person1.getName());

});

(function () {
    const reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;
    const queryText = "哈哈，呵呵"
    console.log(queryText.split(reg));

    function getMaxStr(str1, str2) {
        var textArray = [];
        var max = str1.length > str2.length ? str1 : str2;
        var min = (max == str1 ? str2 : str1);
        for (var i = 0; i < min.length; i++) {
            for (var x = 0, y = min.length - i; y != min.length + 1; x++ , y++) {
                //y表示所取字符串的长度
                var newStr = min.substring(x, y);
                //判断max中是否包含newStr
                if (max.indexOf(newStr) != -1) {
                    textArray.push(newStr);
                }
            }
        }
        return textArray;
    }

    var str1 = "维也纳国际酒店(坂田环城南路店)";
    var str2 = "wei维也纳";
    console.log(getMaxStr(str1, str2));
})()
console.log("fixed bug 101");
