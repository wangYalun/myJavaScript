
var moment = require('moment');

(function () {
	var start = new Date();
	console.log(+start);

	for (var i = 0, sum = 0; i < 100000000; i++) {
		sum += 1;
	}

	var end = new Date();
	console.log(+end);
	console.log(end - start);
});

(function () {
	var arr = [1, 2, 3, 4, 5, 6];

	var filterArr = arr.filter((item) => {
		return item > 7;
	});
	console.log(arr);
	console.log(filterArr);

	var time = moment("19:00", "HH:mm");
	console.log(moment().to(time, 'mm'));

});


(function () {


	var obj = {
		text: "allen",
		fun: function () {
			console.log(this.text);
		},
		fun2: () => {
			console.log(this.text);
		}
	}
	var bigObj = {
		text: "bob",
		obj: obj
	}

	obj.fun();
	obj.fun2();

	bigObj.obj.fun();
	bigObj.obj.fun2();
});

(function () {
	var endTime = +moment("2017-11-06", "YYYY-MM-DD 00:00:00").add(1, "days");

	// var currentTime = (moment(1509940712000).format("YYYY-MM-DD HH:mm:ss"));
	var currentTime = 1509940712000;

	console.log(endTime - currentTime);

	console.log(12 * 60 * 60 * 1000);

	//console.log(leftTime);
});


(function () {
	var arr = [
		{ date: "2017-11-08", name: "allen" },
		{ date: "2017-11-09", name: "allen" },
		{ date: "2017-11-08", name: "bob" }
	];

	var target = arr.find(item => item.date === "2017-11-08");

	target.name = "cici";

	console.log(arr);
	console.log(target);
});

(function () {
	var i = setInterval(() => {
		console.log(new Date());
	}, 10000);

	setTimeout(() => {
		clearInterval(i);
	}, 5000);
});

var Event = (function () {

	var global = this,
		Event, _default = 'default';

	Event = (function () {
		var _listen, _trigger, _remove, _listenOnly, _removeOnly, _slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype.unshift,
			namespaceCache = {},
			_create, find, each = function (ary, fn) {
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

		_listenOnly = function (key, fn, cache) {
			cache[key] = [fn]
		}

		_removeOnly = function (key, cache) {
			cache[key] = []
		}

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
				ret, stack = cache[key];

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
				offlineStack = {},
				_processOfflineStack,
				_initOfflineStack;
			_processOfflineStack = function (key, last) {
				if (!offlineStack[key]) {
					offlineStack[key] = null;
					return;
				}
				if (last === 'last') {
					offlineStack[key].length && offlineStack[key].pop()();
				} else {
					each(offlineStack[key], function () {
						this();
					});
				}

				offlineStack[key] = null;
			}
			_initOfflineStack = function (key) {
				delete offlineStack[key]
			}
			// 离线事件         
			var ret = {
				listen: function (key, fn, last) {
					_listen(key, fn, cache);
					_processOfflineStack(key, last)
				},
				listenOnly: function (key, fn, last) {
					_listenOnly(key, fn, cache);
					_processOfflineStack(key, last);
				},
				removeOnly: function (key, fn) {
					_removeOnly(key, cache, fn);
					_initOfflineStack(key);
				},
				one: function (key, fn, last) {
					_remove(key, cache);
					this.listen(key, fn, last);
					_initOfflineStack(key);
				},
				remove: function (key, fn) {
					_remove(key, cache, fn);
					_initOfflineStack(key);
				},
				trigger: function () {
					var fn, args, _self = this, key = arguments[0];

					_unshift.call(arguments, cache);
					args = arguments;
					fn = function () {
						return _trigger.apply(_self, args);
					};



					if (typeof offlineStack[key] === 'undefined') {
						offlineStack[key] = [];
						return offlineStack[key].push(fn);
					}
					return fn();
				}
			};

			return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
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
			listenOnly: function (key, fn, last) {
				var event = this.create();
				event.listenOnly(key, fn, last);
			},
			removeOnly: function (key, fn, last) {
				var event = this.create();
				event.removeOnly(key, fn, last)
			},
			trigger: function () {
				var event = this.create();
				event.trigger.apply(this, arguments);
			}
		};
	})();

	return Event;

});


(function () {
	var SocketEvent = {
		"fn": function () {

		}
	}

	console.assert(SocketEvent['fn'].bind(this) === SocketEvent['fn'].bind(this))

	var TestEvent = Event.create("test");

	// TestEvent.trigger("carpoolSuccess", { name: "allen" });
	// TestEvent.trigger("carpoolSuccess2", { name: "bob" });


	// TestEvent.listen("carpoolSuccess", function (res) {
	// 	console.log(res);
	// });
	// TestEvent.listen("carpoolSuccess", function (res) {
	// 	console.log(res);
	// });

	TestEvent.listenOnly("carpoolSuccess", function (res) {
		console.log(res);
	});
	TestEvent.removeOnly("carpoolSuccess");

	TestEvent.trigger("carpoolSuccess", { name: "allen" });

	// TestEvent.listenOnly("carpoolSuccess", function (res) {
	// 	console.log(res);
	// });

	TestEvent.one('carpoolSuccess', function (res) {
		console.log(res);
	})

	TestEvent.trigger("carpoolSuccess", { name: "allen" });

	TestEvent.listenOnly("carpoolSuccess", function (res) {
		console.log(res);
	});

});

(function () {

	function getByteLen(val) {
		var len = 0;
		for (var i = 0; i < val.length; i++) {
			var a = val.charAt(i);
			if (a.match(/[^\x00-\xff]/ig) != null) {
				len += 2;
			} else {
				len += 1;
			}
		}
		return len;
	}
	function formatLabelContent(txt) {
		var len = getByteLen(txt);
		if (len > 20) {
			len = 20;
			for (var i = 0; i < txt.length; i++) {
				var a = txt.charAt(i);
				var after = txt.charAt(i + 1);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len -= 2;
				} else {
					len -= 1;
				}
				console.log(a, i, len);
				if (len <= 0) {
					//console.log(txt.substring())
					let sliceIndex = i + 1;
					if (/\(/i.test(a)) {
						sliceIndex = sliceIndex - 1;
					}
					if (/\)/i.test(after)) {
						sliceIndex = sliceIndex + 1;
					}
					let firstTxt = txt.slice(0, sliceIndex);
					// console.log(firstTxt, i)
					let lastTxt = txt.slice(sliceIndex);
					txt = firstTxt + "\n" + lastTxt;
					break;
				}
			}
		}
		return txt;
	}

	console.log(formatLabelContent("你好哈哈哈哈哈a(haha)哈哈哈哈啊哈哈"));
});

function unOrder(dataStore) {
	var temp = dataStore.slice(0), len = dataStore.length;
	for (let i = 0; i < len; i++) {
		let index = Math.floor(Math.random() * (len - i));
		dataStore[i] = temp[index];
		//删除已经获取的值
		temp.splice(index, 1);
	}
	return dataStore;
}

(function () {
	// const boyStr = "王雅伦 杨兴 邱一鸣 杨颖 李明 邱剑波 张汉江 段德辉 朱永扬  郑望安 李想 梁琨琳 "
	// 	+ "刘国权 李岳光 康骄 肖俊 詹宸 陈奕宇 周勇曙 杨安武 刘威明 黄鹏 高俊业 周垠驰 贺兵兵 陈恒 常涛 涂毅";
	const boyStr = "王雅伦 邱一鸣 杨颖 李明 邱剑波 张汉江 段德辉 郑望安 李想 梁琨琳 "
		+ "刘国权 李岳光 肖俊 詹宸 杨安武 黄鹏 高俊业 周垠驰 常涛";
	const girlStr = "钟高丽 张小雨 贺红";
	const GROUP = "ABCDEFGHIJKLMNOPQRSTUVWSYZ";
	// const GroupList = GROUP.split("");
	let boyList = boyStr.split(/\s+/);
	let girlList = girlStr.split(/\s+/);

	// 随机排序
	boyList = unOrder(boyList);
	girlList = unOrder(girlList);

	const GroupList = GROUP.split("").map((item, index) => {
		if (girlList.length) {
			return [item, girlList.pop(), boyList.pop()]
		} else {
			return [item, boyList.pop(), boyList.pop()]
		}
	})
	console.log(GroupList);
});

(() => {
	// 利用字符串模板
	const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
	// 利用数学方法
	const round2 = (num, decimals) => {
		let _num = num * Math.pow(10, decimals);
		_num = Math.round(_num);
		return _num / Math.pow(10, decimals);
	}
	console.log(round(1.3466, 3));
	console.log(round2(1.3466, 3));
})()



