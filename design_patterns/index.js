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
(function(){

})();




