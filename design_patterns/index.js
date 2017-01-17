/**
 * JavaScript 设计模式
 */

/**
 * 函数节流
 */
(function () {
    var throttle = function (fn, interval) {
        var __self = fn, timer, firstTime = true;

        return function () {
            var args = arguments, __me = this;

            if (firstTime) {
                __self.apply(__me, args);
                return firstTime = false;
            }

            if (timer) {
                return false;
            }

            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                __self.apply(__me, args);
            }, interval || 500);
        }
    };

    //测试代码
    var currentTime = +new Date();
    setInterval(throttle(function () {
        console.log(+new Date() - currentTime);
        currentTime = +new Date();
    }, 200), 0);
});



/**
 * 分时节流
 */
(function () {
    var timeChunk = function (ary, fn, count) {
        var obj, t;

        var len = ary.length;

        var start = function () {
            for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
                var obj = ary.shift();
                fn(obj);
            }
        };

        return function () {
            t = setInterval(function () {
                if (ary.length === 0) {
                    //如果全部节点都已经被创建好
                    return clearInterval(t);
                }
                start();
            }, 200);
        };
    };

    var ary = [];

    for (var i = 1; i <= 1000; i++) {
        ary.push(i);
    }

    var renderList = timeChunk(ary, function (n) {
        console.log(n);
    }, 8);

    renderList();
});

/**
 * 惰性加载
 */

(function () {
    var o = {};
    o.name = "allen";
    var f = (function () {
        if (o.name === 'allen') {
            return function (n) {
                console.log("f:" + n);
            };
        }
        return function (n) {
            console.log("f2:" + n);
        };
    })();

    f('allen');
});

/**
 * 单例模式
 */

(function () {
    /**
     * 透明的单例模式
     */
    var LogNum = (function () {
        var instance;
        var LogNum = function (num) {
            if (instance) {
                return instance;
            }
            this.num = num;
            this.init();

            return instance = this;
        };

        LogNum.prototype.init = function () {
            console.log("init");
        };
        return LogNum;
    })();

    var a = new LogNum(100);
    var b = new LogNum(200);

    console.log(a === b);
    /**
     * 代理实现单例模式
     */

    var ProxySingleton = (function () {
        var instance;
        return function (num) {
            if (!instance) {
                instance = new LogNum(num);
            }
            return instance;
        }
    })();

    /**
     * 惰性单例 ，非常有用，有用的程度超过我们的想象；
     */
    function Singleton() {

    }
    Singleton.getInstance = (function () {
        var instance;
        return function (name) {
            if (!instance) {
                instance = new Singleton(name);
            }

            return instance;
        }
    })();
});
/**
 * 策略模式
 * 定义：定义一系列的算法，把他们一个个封装起来，并且使他们相互替换。
 */
(function () {

});

/**
 * 迭代器模式
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示。
 */
(function () {
    var a = { "0": "allen", "1": 20, length: 2 };
    console.log(a);
    [].forEach.call(a, function (item, index, arr) {
        console.log(index + ":" + item);
    });

    var each = function (arr, callback) {
        for (var i = 0, len = arr.length; i < len; i++) {
            callback.call(arr[i], i, arr[i]);
        }
    };
    each(a, function (index, item) {
        console.log(index + ":" + item);
    });


    /**
     * 内部迭代器和外部迭代器
     */

    var Iterator = function (obj) {
        var current = 0;

        var next = function () {
            current++;
        };

        var isDone = function () {
            return current >= obj.length;
        };

        var getCurrItem = function () {
            return obj[current];
        };

        return {
            next: next,
            isDone: isDone,
            getCurrItem: getCurrItem
        };
    };

    var compare = function (iterator1, iterator2) {
        while (!iterator1.isDone() && !iterator2.isDone()) {
            if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
                throw new Error("iterator1 iterator2 not equal");
            }
            iterator1.next();
            iterator2.next();
        }
        console.log("iterator1 is equal iterator2");
    };

    var iterator1 = Iterator([1, 2, 3]);
    var iterator2 = Iterator([1, 2, 3]);

    compare(iterator1, iterator2);

    /**
     * 迭代类数组对象和字面量对象
     */
    //参考jQuery中的 $.each 

    /**
     * 倒序迭代器
     */
    var reverseEach = function (arr, callback) {
        for (var len = arr.length - 1; len >= 0; len--) {
            callback.call(arr[len], len, arr[len]);
        }
    };

    reverseEach(a, function (index, item) {
        console.log(index + ":" + item);
    });

    //test
    function test() {
        try {
            return 'try';
        } catch (e) {
            return 'catch';
        }
        finally {
            return 'finally';
        }
    }

    console.log(test());//finally

});

/**
 * 发布-订阅模式
 * 又叫观察者模式,它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所以依赖于它的对象都得到通知。
 * 在JavaScript开发中，我们一般用事件模型来替代传统的发布-订阅模式
 */

(function () {
    //自定义的事件
    /**
     * 模拟售楼处给订阅者发送消息
     */
    var salesOffices = {}; //定义售楼处
    salesOffices.clientList = {};//缓存列表，存放订阅者的回调函数

    salesOffices.listen = function (key, fn) { //增加订阅者
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); //订阅的消息添加进缓存列表
    };

    salesOffices.trigger = function () {
        var key = [].shift.call(arguments), fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };

    //测试代码

    salesOffices.listen('恒大帝景', function (price, squareMeter) {
        console.log("恒大帝景" + squareMeter + "平米，" + price + "元/平米");
    });
    salesOffices.listen('锦绣香江', function (price, squareMeter) {
        console.log("锦绣香江");
    });
    //发布恒大帝景的消息
    salesOffices.trigger('恒大帝景', 7300, 107);
    //发布锦绣香江的消息
    salesOffices.trigger('锦绣香江');

    //
    /**
     * 发布-订阅模式的通用实现
     */

    var event = {
        listen: function (key, fn) {
            if (!this.clientList[key]) {
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn); //订阅的消息添加进缓存列表
        },
        trigger: function () {
            var key = [].shift.call(arguments), fns = this.clientList[key];
            if (!fns || fns.length === 0) {
                return false;
            }

            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        },
        //移除订阅事件
        remove: function (key, fn) {
            var fns = this.clientList[key];

            if (!fns) {
                return false;
            }
            if (!fn) {
                fns && (fns.length = 0);
            } else {
                for (var len = fns.length - 1; len >= 0; len--) {
                    var _fn = fns[len];
                    if (_fn === fn) {
                        fns.splice(len, 1);
                    }
                }
            }
        }
    };



    var installEvent = function (obj) {
        obj.clientList = {};
        for (var i in event) {
            obj[i] = event[i];
        }
    };

    var obj1 = {};
    var obj2 = {};

    installEvent(obj1);
    installEvent(obj2);

    obj1.listen('night', function () {
        console.log("nigth");
    });

    obj2.listen('night', function () {
        console.log('good nigth');
    });

    obj1.trigger('night');
    //console.log(event.clientList);


})();



