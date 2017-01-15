/**
 * @author Allen
 * JavaScript 设计模式 学习笔记
 */

/**
 * 策略模式之表单验证
 */
(function () {

    var strategies = {
        isNonEmpty: function (value, errorMsg) {
            if (value === "") {
                return errorMsg;
            }
        },
        minLength: function (value, length, errorMsg) {
            if (value.length < length) {
                return errorMsg;
            }
        },
        isMobile: function (value, errorMsg) {
            if (!/^1[3578][\d]{9}$/.test(value)) {
                return errorMsg;
            }
        }
    };


    var Validator = function () {
        this.cache = []; // 保存校验规则
    };
    // Validator.prototype.add = function (dom, rule, errorMsg) {
    //     var ary = rule.split(':'); // 把strategy 和参数分开
    //     this.cache.push(function () { // 把校验的步骤用空函数包装起来，并且放入cache
    //         var strategy = ary.shift(); // 用户挑选的strategy
    //         ary.unshift(dom.value); // 把input 的value 添加进参数列表
    //         ary.push(errorMsg); // 把errorMsg 添加进参数列表
    //         return strategies[strategy].apply(dom, ary);
    //     });
    // };
    Validator.prototype.add = function (dom, rules) {
        var self = this;
        for (var i = 0, rule; rule = rules[i++];) {
            (function (rule) {
                var strategyAry = rule.strategy.split(':');
                var errorMsg = rule.errorMsg;
                self.cache.push(function () {
                    var strategy = strategyAry.shift();
                    strategyAry.unshift(dom.value);
                    strategyAry.push(errorMsg);
                    console.log(strategyAry);
                    return strategies[strategy].apply(dom, strategyAry);
                });
            })(rule);
        }
    };
    Validator.prototype.start = function () {
        for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
            if (msg) { // 如果有确切的返回值，说明校验没有通过
                return msg;
            }
        }
    };

    var validataFunc = function () {
        var validator = new Validator();
        /***************添加一些校验规则****************/
        validator.add(registerForm.userName, [{
            strategy: 'isNonEmpty',
            errorMsg: '用户名不能为空'
        }, {
            strategy: 'minLength:6',
            errorMsg: '用户名长度不能少于6位'
        }]);
        // validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6 位');
        // validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
        validator.add(registerForm.password, [{
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于6 位'
        }]);
        validator.add(registerForm.phoneNumber, [{
            strategy: 'isMobile',
            errorMsg: '手机号码格式不正确'
        }]);
        var errorMsg = validator.start(); // 获得校验结果
        return errorMsg; // 返回校验结果
    };

    var registerForm = document.getElementById('registerForm');
    registerForm.onsubmit = function () {
        var errorMsg = validataFunc(); // 如果errorMsg 有确切的返回值，说明未通过校验
        console.log("fasdf");
        if (errorMsg) {
            alert(errorMsg);
            return false; // 阻止表单提交
        }
    };

})();

/**
 * 代理模式
 * 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问
 */
/**
 * 保护代理和虚拟代理
 */
(function () {
    /**
     * 虚拟代理实现图片预加载
     */
    var myImage = (function () {
        var imgNode = document.createElement("img");
        document.body.appendChild(imgNode);

        return {
            setSrc: function (src) {
                imgNode.src = src;
            }
        }
    })();

    var proxyImage = (function () {
        var img = new Image();
        img.onload = function () {
            myImage.setSrc(this.src);
        };

        return {
            setSrc: function (src) {
                myImage.setSrc('images/loading.jpg');
                img.src = src;
            }
        }
    })();
    //测试代码
    proxyImage.setSrc("http://1gaopeng-10005048.file.myqcloud.com/banner/20170112/20f4ba31e15a27f.png");
    //代理和本体接口的一致性

    /**
     * 虚拟代理合并HTTP请求，合并文件上传请求
     */
    var synchronousFile = function (id) {
        console.log('开始同步文件，id 为: ' + id);
    };
    var proxySynchronousFile = (function () {
        var cache = [], // 保存一段时间内需要同步的ID
            timer; // 定时器
        return function (id) {
            cache.push(id);
            if (timer) { // 保证不会覆盖已经启动的定时器
                return;
            }
            timer = setTimeout(function () {
                synchronousFile(cache.join(',')); // 2 秒后向本体发送需要同步的ID 集合
                clearTimeout(timer); // 清空定时器
                timer = null;
                cache.length = 0; // 清空ID 集合
            }, 2000);
        }
    })();
    var checkbox = document.getElementById("checkbox").getElementsByTagName("input");
    //var checkbox = document.getElementsByTagName('input');
    for (var i = 0, c; c = checkbox[i++];) {
        c.onclick = function () {
            if (this.checked === true) {
                proxySynchronousFile(this.id);
            }
        }
    };

    /**
     * 缓存代理用户ajax异步请求数据
     */
    /**
     * 小结：
     *  代理模式包括许多小分类，在JavaScript 开发中最常用的是虚拟代理和缓存代理。
     * 虽然代理模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。
     * 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。
     */

})();

/**
 * 迭代器模式
 */
(function(){
    
})();

var miniConsole = (function () {
    var cache = [];
    var handler = function (ev) {
        if (ev.keyCode === 113) {
            var script = document.createElement("script");
            script.onload = function () {
                for (var i = 0, fn; fn = cache[i++];) {
                    fn();
                }
            };
            script.src = 'js/miniConsole.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            document.body.removeEventListener('keydown', handler);//只加载一次miniConsole.js
        }
    };
    document.body.addEventListener('keydown', handler, false);

    return {
        log: function () {
            var args = arguments;
            cache.push(function () {
                return miniConsole.log.apply(miniConsole, args);
            });
        }
    }
})();
miniConsole.log("miniConsole");
