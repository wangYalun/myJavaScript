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

    /**
     * 创建命名空间
     */

    var Event = (function () {
        var global = this,
            Event,
            _default = 'default';
        Event = (function () {
            var _listen,
                _trigger,
                _remove,
                _slice = Array.prototype.slice,
                _shift = Array.prototype.shift,
                _unshift = Array.prototype.unshift,
                namespaceCache = {},
                _create,
                find,
                each = function (ary, fn) {
                    var ret;
                    for (var i = 0, l = ary.length; i < l; i++) {
                        var n = ary[i];
                        ret = fn.call(n, i, n);
                    }
                    return ret;
                };
            _listen = function (key, fn, cache) {
                if (!cache[key]) {
                    cache[key] = [];
                }
                cache[key].push(fn);
            };
            _remove = function (key, cache, fn) {
                if (cache[key]) {
                    if (fn) {
                        for (var i = cache[key].length; i >= 0; i--) {
                            if (cache[key][i] === fn) {
                                cache[key].splice(i, 1);
                            }
                        }
                    } else {
                        cache[key] = [];
                    }
                }
            };
            _trigger = function () {
                var cache = _shift.call(arguments),
                    key = _shift.call(arguments),
                    args = arguments,
                    _self = this,
                    ret,
                    stack = cache[key];
                if (!stack || !stack.length) {
                    return;
                }
                return each(stack, function () {
                    return this.apply(_self, args);
                });
            };
            _create = function (namespace) {
                var namespace = namespace || _default;
                var cache = {},
                    offlineStack = [], // 离线事件
                    ret = {
                        listen: function (key, fn, last) {
                            _listen(key, fn, cache);
                            if (offlineStack === null) {
                                return;
                            }
                            if (last === 'last') {
                                offlineStack.length && offlineStack.pop()();
                            } else {
                                each(offlineStack, function () {
                                    this();
                                });
                            }
                            offlineStack = null;
                        },
                        one: function (key, fn, last) {
                            _remove(key, cache);
                            this.listen(key, fn, last);
                        },
                        remove: function (key, fn) {
                            _remove(key, cache, fn);
                        },
                        trigger: function () {
                            var fn,
                                args,
                                _self = this;
                            _unshift.call(arguments, cache);
                            args = arguments;
                            fn = function () {
                                return _trigger.apply(_self, args);
                            };
                            if (offlineStack) {
                                return offlineStack.push(fn);
                            }
                            return fn();
                        }
                    };
                return namespace ?
                    (namespaceCache[namespace] ? namespaceCache[namespace] :
                        namespaceCache[namespace] = ret)
                    : ret;
            };
            return {
                create: _create,
                one: function (key, fn, last) {
                    var event = this.create();
                    event.one(key, fn, last);
                },
                remove: function (key, fn) {
                    var event = this.create();
                    event.remove(key, fn);
                },
                listen: function (key, fn, last) {
                    var event = this.create();
                    event.listen(key, fn, last);
                },
                trigger: function () {
                    var event = this.create();
                    event.trigger.apply(this, arguments);
                }
            };
        })();
        return Event;
    })();

    Event.create('namespace1').listen('add', function () {
        console.log(arguments);
    });

    Event.create('namespace1').trigger('add', 'Hello World');

});

/**
 * 命令模式
 */
/**
 * 宏命令 
 */
(function () {

    var Command = function (commandFun) {
        this.commandFun = commandFun;
    };
    Command.prototype.execute = function () {
        this.commandFun();
    };

    var closeDoorCommand = new Command(function () {
        console.log('关门');
    });

    var openPCCommand = new Command(function () {
        console.log('打开电脑');
    });

    var openQQCommand = new Command(function () {
        console.log('登录QQ');
    });

    var openTVCommand = new Command(function () {
        console.log('打开电视');
    });

    var openSoundCommand = new Command(function () {
        console.log('打开音响');
    });

    //宏命令
    var MacroCommand = function () {
        this.commandsList = [];
    };

    MacroCommand.prototype.add = function (command) {
        this.commandsList.push(command);
    };
    MacroCommand.prototype.execute = function () {
        for (var i = 0, command; command = this.commandsList[i++];) {
            command.execute();
        }
    };

    var macroCommand = new MacroCommand();

    macroCommand.add(closeDoorCommand);
    macroCommand.add(openPCCommand);
    macroCommand.add(openQQCommand);



    var bigMacroCommand = new MacroCommand();

    bigMacroCommand.add(openTVCommand);
    bigMacroCommand.add(openSoundCommand);
    bigMacroCommand.add(macroCommand);

    bigMacroCommand.execute();
});

/**
 * 组合模式
 */
(function () {
    //参考命令模式中的 bigMacroCommand

    //组合模式例子--扫描文件夹
    var Folder = function (name) {
        this.name = name;
        this.files = [];
        //引用父对象
        this.parent = null;
    };

    Folder.prototype.add = function (file) {
        file.parent = this;
        this.files.push(file);
    };

    Folder.prototype.scan = function () {
        console.log('开始扫描文件夹:' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    };

    Folder.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, len = files.length - 1; len >= 0; len--) {
            var file = files[len];
            if (file === this) {
                files.splice(len, 1);
            }
        }
    };

    var File = function (name) {
        this.name = name;

        this.parent = null;
    };
    File.prototype.add = function () {
        throw new Erro('文件下面不能再添加文件');
    };
    File.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    };

    File.prototype.remove = function () {
        if (!this.parent) {
            return;
        }

        for (var files = this.parent.files, len = files.length - 1; len >= 0; len--) {
            var file = files[len];
            if (file === this) {
                files.splice(len, 1);
            }
        }
    };

    var folder = new Folder('学习资料');

    var folder1 = new Folder('JavaScript');

    var folder2 = new Folder('jQuery');

    var file1 = new File('JavaScript设计模式与开发模式');
    var file2 = new File('精通jQuery');
    var file3 = new File('重构与模式');

    folder1.add(file1);
    folder2.add(file2);

    folder.add(folder1);
    folder.add(folder2);
    folder.add(file3);

    var folder3 = new Folder('Nodejs');

    folder3.add(new File('深入浅出Node.js'));

    folder.add(folder3);

    folder.scan();

    file3.remove();

    folder.scan();

});


/**
 * 享元模式
 */
(function () {
    var toolTipFactory = (function () {
        var toolTipPool = [];
        return {
            create: function () {
                if (toolTipPool.length === 0) {
                    var div = document.createElement('div');
                    document.body.appendChild(div);
                    return div;
                } else {
                    return toolTipPool.shift();
                }
            },
            recover: function (tooltipDom) {
                return toolTipPool.push(tooltipDom);
            }
        }
    })();
});

/**
 * 职责链模式
 */
(function () {
    var order500 = function (orderType, pay, stock) {
        if (orderType === 1 && pay === true) {
            console.log('500元定金预约，得到100优惠券');
        } else {
            //order200(orderType, pay, stock);
            return 'nextSuccessor';
        }
    };

    var order200 = function (orderType, pay, stock) {
        if (orderType === 2 && pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            //orderNormal(orderType, pay, stock);
            return 'nextSuccessor';
        }
    };

    var orderNormal = function (orderType, pay, stock) {
        if (stock > 0) {
            console.log('普通购买，没有优惠券');
        } else {
            console.log('手机库存不足');
        }
    };

    // 测试结果：
    // order500(1, true, 500); // 输出：500 元定金预购, 得到100 优惠券
    // order500(1, false, 500); // 输出：普通购买, 无优惠券
    // order500(2, true, 500); // 输出：200 元定金预购, 得到500 优惠券
    // order500(3, false, 500); // 输出：普通购买, 无优惠券
    // order500(3, false, 0); // 输出：手机库存不足

    var Chain = function (fn) {
        this.fn = fn;
        this.successor = null;
    };
    Chain.prototype.setNextSuccessor = function (successor) {
        return this.successor = successor;
    };

    Chain.prototype.passRequest = function () {
        var ret = this.fn.apply(this, arguments);
        if (ret === 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
    };

    Chain.prototype.next = function () {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    };

    var chainOrder500 = new Chain(order500);
    var chainOrder200 = new Chain(order200);
    var chainOrderNormal = new Chain(orderNormal);

    chainOrder500.setNextSuccessor(chainOrder200);
    chainOrder200.setNextSuccessor(chainOrderNormal);

    // chainOrder500.passRequest(1, true, 500); // 输出：500 元定金预购, 得到100 优惠券
    // chainOrder500.passRequest(1, false, 500); // 输出：普通购买, 无优惠券
    // chainOrder500.passRequest(2, true, 500); // 输出：200 元定金预购, 得到500 优惠券
    // chainOrder500.passRequest(3, false, 500); // 输出：普通购买, 无优惠券
    // chainOrder500.passRequest(3, false, 0); // 输出：手机库存不足


    var fn1 = new Chain(function () {
        console.log(1);
        return 'nextSuccessor';
    });

    var fn2 = new Chain(function () {
        console.log(2);
        var self = this;
        setTimeout(function () {
            self.next();
        }, 1000);
    });

    var fn3 = new Chain(function () {
        console.log(3);
    });

    fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
    fn1.passRequest();


    /**
     * 用AOP实现职责链
     */

    Function.prototype.after = function (fn) {
        var self = this;
        return function () {
            var ret = self.apply(this, arguments);
            if (ret === 'nextSuccessor') {
                return fn.apply(this, arguments);
            }
        };
    };

    var order = order500.after(order200).after(orderNormal);

    order(1, true, 500); // 输出：500 元定金预购, 得到100 优惠券
    order(1, false, 500); // 输出：普通购买, 无优惠券
    order(2, true, 500); // 输出：200 元定金预购, 得到500 优惠券
    order(3, false, 500); // 输出：普通购买, 无优惠券
    order(3, false, 0); // 输出：手机库存不足


});

/**
 * 中介者模式
 */
(function () {
    /**
     * 用中介者模式改造泡泡堂游戏
     */
    function Player(name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = 'alive';
    }

    Player.prototype.win = function () {
        console.log(this.name + ' won ');
    };

    Player.prototype.lose = function () {
        console.log(this.name + 'lost');
    };

    Player.prototype.die = function () {
        this.state = 'dead';
        playerDirector.reciveMessage('playerDead', this);
    };

    Player.prototype.remove = function () {
        playerDirector.reciveMessage('removePlayer', this);
    };

    Player.prototype.changeTeam = function () {
        playerDirector.reciveMessage('changeTeam', this, color);
    };



    //工厂类
    var playerFactory = function (name, teamColor) {
        var newPlayer = new Player(name, teamColor);
        playerDirector.reciveMessage('addPlayer', newPlayer);

        return newPlayer;
    };


    var playerDirector = (function () {
        var players = {},//保存所有玩家
            operations = {};//中介者可以执行的操作

        operations.addPlayer = function (player) {
            var teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || []; //如果该颜色的玩家没有成立队伍，则组立成一个新队伍；

            players[teamColor].push(player);//添加玩家进队伍
        };

        //移除一个玩家
        operations.removePlayer = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor] || [];

            for (var i = teamPlayers.length - 1; i >= 0; i--) {
                if (teamPlayers[i] === player) {
                    teamPlayers.splice(i, 1);
                }
            }
        };
        //玩家换队
        operations.changeTeam = function (player, newTeamColor) {
            operations.removePlayer(player);
            player.teamColor = newTeamColor;
            operations.addPlayer(player);
        };

        operations.playerDead = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor];

            var all_dead = true;

            for (var i = 0, player; player = teamPlayers[i++];) {
                if (player.state !== 'dead') {
                    all_dead = false;
                    break;
                }
            }

            if (all_dead === true) {
                for (var i = 0, player; player = teamPlayers[i++];) {
                    player.lose();
                }

                for (var color in players) {
                    if (color !== teamColor) {
                        var teamPlayers = players[color];
                        for (var i = 0, player; player = teamPlayers[i++];) {
                            player.win();
                        }
                    }
                }
            }
        };

        var reciveMessage = function () {
            var message = Array.prototype.shift.call(arguments); //arguments 的第一个参数为消息名称;
            operations[message].apply(this, arguments);
        };

        return {
            reciveMessage: reciveMessage
        };

    })();

    var player1 = playerFactory('皮蛋', 'red'),
        player2 = playerFactory('小乖', 'red'),
        player3 = playerFactory('宝宝', 'red'),
        player4 = playerFactory('小强', 'red');

    var player5 = playerFactory('黑妞', 'blue'),
        player6 = playerFactory('葱头', 'blue'),
        player7 = playerFactory('胖墩', 'blue'),
        player8 = playerFactory('海盗', 'blue');

    var player9 = playerFactory('Allen', 'orange'),
        player10 = playerFactory('Bob', 'orange'),
        player11 = playerFactory('Cici', 'orange'),
        player12 = playerFactory('Dewi', 'orange');


    player5.die();
    player1.die();
    player2.die();
    player3.die();
    player4.die();

});


/**
 * 装饰者模式
 */

(function () {
    var plane = {
        fire: function () {
            console.log('发射普通子弹');
        }
    }
    var missileDecorator = function () {
        console.log('发射导弹');
    }
    var atomDecorator = function () {
        console.log('发射原子弹');
    }
    var fire1 = plane.fire;
    plane.fire = function () {
        fire1();
        missileDecorator();
    }
    var fire2 = plane.fire;
    plane.fire = function () {
        fire2();
        atomDecorator();
    }
    plane.fire();

    //例子

    //数据统计上报-AOP分离
    Function.prototype.after=function(afterfn){
        var __self=this;
        return function(){
            var ret=__self.apply(this,arguments);
            afterfn.apply(this,arguments);
            return ret;
        };
    };

    var log=function(){
        console.log('发送数据到数据接收API');
    };
});

/**
 * 状态模式
 */

(function(){
    console.log('在dom中实现,见client文件夹中代码');

    //首先将定义3 个状态类，分别是offLightState、WeakLightState、strongLightState。

    //offlineState

    var OffLightState=function(light){
        this.light=light;
    };

    OffLightState.prototype.buttonWasPressed=function(){
        console.log('弱光');
        this.light.setState(this.light.weakLightState);
    };

    var WeakLightState=function(light){
        this.light=light;
    };

    WeakLightState.prototype.buttonWasPressed=function(){
        console.log('强光');
        this.light.setState(this.light.strongLightState);
    };

    //StrongLightState
    var StrongLightState=function(light){
        this.light=light;
    }

    StrongLightState.prototype.buttonWasPressed=function(){
        console.log('关灯');
        this.light.setState(this.light.offLightState);
    };


    var Light=function(){
        this.offLightState=new OffLightState();
        this.weakLightState=new WeakLightState();
        this.strongLightState=new StrongLightState();
        this.button=null;
    };

    Light.prototype.init=function(){
        var button=document.createElement('button'),
        self=this;

        this.button=document.body.appendChild(button);
        this.button.innerHTML='开关';
        this.currState=this.offLightState;

        this.button.onclick=function(){
            self.currState.buttonWasPressed();
        }
    };

    Light.prototype.setState=function(newState){
        this.currState=newState;
    };

})();
/**
 * 多态
 */

// var Animal=function(){};

// Animal.prototype.say=function(){
//     console.log('Animal');
// }

// var Dog=function(){};
// Dog.prototype.say=function(){
//     console.log('汪汪');
// };

// var Cat=function(){};

// Cat.prototype.say=function(){
//     console.log('喵喵');
// }

// function animalSay(animal){
//     animal.say();
// };

// animalSay(new Dog()); // 汪汪
// animalSay(new Cat()); // 喵喵
