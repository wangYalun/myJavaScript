
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

	const boyStr = "张革初 蔡鹏清 卢健 王素零 肖俊俊 王雅伦 廖海 刘刚 杨颖 朱永扬 刘国权 梁琨林 刘培存 赵帅 郑望安 任步廷 周勇曙 左星原 李明 马江山 康骄 刘昌敏 詹宸 邱一鸣 汤武 李岳光 卢科 郭晓刚 段德辉 刘威明 王勇 张汉江 杨安武 邱剑波 高俊业 周垠驰 贺兵兵 任冉 常涛 陈恒 涂毅 蔡炜 杨良东 徐康 牟伟华 刘宸豪 李春林 周倍安";
	const girlStr = "陈玥妧 彭胜兰 钟高俐 冯蕾 刘灵 贺红 陈佳 张小雨 张明昱 周婷 黄晓卿 陈秋汝";
	const GROUP = "ABCDEFGHIJKLMNOPQRSTUVWSYZ";
	// const GroupList = GROUP.split("");
	let boyList = boyStr.split(/\s+/);
	let girlList = girlStr.split(/\s+/);

	// 随机排序
	boyList = unOrder(boyList);
	girlList = unOrder(girlList);

	const girlNum = 2; //每组女生人数
	const boyNum = 8;// 每组男生人数
	const totalNum = girlNum + boyNum; // 每组总人数

	const GroupList = GROUP.split("").map((item, index) => {
		const groupItem = [item];
		if (girlList.length && boyList.length) {
			for (let i = 0; i < girlNum; i++) {
				groupItem.push(girlList.pop())
			}
			for (let j = 0; j < boyNum; j++) {
				groupItem.push(boyList.pop())
			}
			return groupItem;
			// return [item, girlList.pop(), boyList.pop()]
		} else if (boyList.length && boyNum) {
			for (let j = 0; j < totalNum; j++) {
				groupItem.push(boyList.pop())
			}
			return groupItem;
			// return [item, boyList.pop(), boyList.pop()]
		}
		return groupItem;
	})
	// console.log(GroupList.filter(item => item.length > 1));
	GroupList.filter(item => item.length > 1).forEach(item => {
		console.log(item.join(","));
	})
});

(function () {
	const allNames = "张革初 蔡鹏清 卢健 王素零 肖俊俊 王雅伦 廖海 刘刚 杨颖 朱永扬 刘国权 梁琨林 刘培存 赵帅 郑望安 任步廷 周勇曙 左星原 李明 马江山 康骄 刘昌敏 詹宸 邱一鸣 汤武 李岳光 卢科 郭晓刚 段德辉 刘威明 王勇 张汉江 杨安武 邱剑波 高俊业 周垠驰 贺兵兵 任冉 常涛 陈恒 涂毅 蔡炜 杨良东 徐康 牟伟华 刘宸豪 李春林 周倍安 陈玥妧 彭胜兰 钟高俐 冯蕾 刘灵 贺红 陈佳 张小雨 张明昱 周婷 黄晓卿 陈秋汝"
	const theNames = ['张小雨',
		'陈秋汝',
		'张汉江',
		'朱永扬',
		'赵帅',
		'梁琨林',
		'陈恒',
		'刘国权',
		'段德辉',
		'贺兵兵',
		'张明昱',
		'黄晓卿',
		'左星原',
		'刘培存',
		'周倍安',
		'牟伟华',
		'杨颖',
		'涂毅',
		'邱一鸣',
		'汤武',
		'彭胜兰', '贺红', '马江山', '任冉', '蔡鹏清', '刘昌敏', '郭晓刚', '蔡炜', '邱剑波', '王勇',
		'冯蕾', '钟高俐', '刘威明', '郑望安', '常涛', '刘宸豪', '詹宸', '刘刚', '李春林', '康骄',
		'周婷', '刘灵', '卢健', '杨安武', '周垠驰', '李明', '任步廷', '王雅伦', '卢科', '王素零'];

	const the = allNames.split(" ").filter(item => {
		return theNames.indexOf(item) < 0;
	})
	console.log(the.reverse());

})();



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
});

(function () {
	const data = { "status": 200, "time": 1565927337, "msg": "操作成功", "data": { "menus": [{ "path": "/ticketorder", "id": 1, "parentId": 0, "name": "ticketorder", "nameDesc": "运营数据", "menus": [{ "path": "/ticketorder/ordermanager", "id": 2, "parentId": 1, "name": "ordermanager", "nameDesc": "订单管理", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/ticketorder/ordermanager/orderdetail/:orderId", "id": 5, "parentId": 1, "name": "订单管理-订单详情", "nameDesc": "订单管理-订单详情", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/ticketorder/ticketmanager", "id": 7, "parentId": 1, "name": "ticketmanager", "nameDesc": "车票管理", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/ticketorder/ticketmanager/ticketdetail/:ticketId", "id": 11, "parentId": 1, "name": "车票管理-车票详情", "nameDesc": "车票管理-车票详情", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/ticketorder/operation_statistics", "id": 12, "parentId": 1, "name": "operation_statistics", "nameDesc": "营运统计", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": [{ "id": 13, "parentId": 12, "name": "营运统计", "key": null, "authButtonList": { "pageButtonList": [{ "id": 14, "parentId": 13, "name": "exportData", "selected": 0 }, { "id": 15, "parentId": 13, "name": "exportReport", "selected": 0 }], "tableButtonList": [{ "id": 16, "parentId": 13, "name": "dataDetail", "selected": 0 }] } }, { "id": 17, "parentId": 12, "name": "班次统计", "key": null, "authButtonList": { "pageButtonList": [{ "id": 18, "parentId": 17, "name": "exportData", "selected": 0 }, { "id": 19, "parentId": 17, "name": "exportReport", "selected": 0 }], "tableButtonList": [{ "id": 20, "parentId": 17, "name": "dataDetail", "selected": 0 }] } }, { "id": 21, "parentId": 12, "name": "车票统计", "key": null, "authButtonList": { "pageButtonList": [{ "id": 22, "parentId": 21, "name": "exportData", "selected": 0 }, { "id": 23, "parentId": 21, "name": "exportReport", "selected": 0 }], "tableButtonList": [] } }, { "id": 24, "parentId": 12, "name": "订单统计", "key": null, "authButtonList": { "pageButtonList": [{ "id": 25, "parentId": 24, "name": "exportData", "selected": 0 }], "tableButtonList": [] } }], "selected": 0 }, { "path": "/ticketorder/operation_statistics/operation/plan_detail", "id": 26, "parentId": 1, "name": "营运统计-班次详情", "nameDesc": "营运统计-班次详情", "menus": [], "authButtonList": { "pageButtonList": [{ "id": 27, "parentId": 26, "name": "exportData", "selected": 0 }], "tableButtonList": [{ "id": 28, "parentId": 26, "name": "dataDetail", "selected": 0 }] }, "tabs": null, "selected": 0 }, { "path": "/ticketorder/operation_statistics/operation/ticket_detail/:id", "id": 29, "parentId": 1, "name": "营运统计-车票详情", "nameDesc": "营运统计-车票详情", "menus": [], "authButtonList": { "pageButtonList": [{ "id": 30, "parentId": 29, "name": "exportData", "selected": 0 }], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/ticketorder/operation_statistics/plan/ticket_detail/:id", "id": 32, "parentId": 1, "name": "班次统计-车票详情", "nameDesc": "班次统计-车票详情", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": null }, { "path": "/setting", "id": 144, "parentId": 0, "name": "setting", "nameDesc": "系统设置", "menus": [{ "path": "/setting/usermanager", "id": 237, "parentId": 144, "name": "usermanager", "nameDesc": "用户管理", "menus": [], "authButtonList": { "pageButtonList": [{ "id": 238, "parentId": 237, "name": "addNew", "selected": 0 }], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/setting/usermanager/add", "id": 239, "parentId": 144, "name": null, "nameDesc": "添加用户页面", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/setting/usermanager/edit/:userId", "id": 240, "parentId": 144, "name": null, "nameDesc": "编辑用户页面", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/setting/roleauthmanager", "id": 241, "parentId": 144, "name": "roleauthmanager", "nameDesc": "角色权限", "menus": [], "authButtonList": { "pageButtonList": [{ "id": 242, "parentId": 241, "name": "addNew", "selected": 0 }, { "id": 243, "parentId": 241, "name": "edit", "selected": 0 }, { "id": 244, "parentId": 241, "name": "start", "selected": 0 }, { "id": 245, "parentId": 241, "name": "stop", "selected": 0 }], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/setting/roleauthmanager/add", "id": 246, "parentId": 144, "name": null, "nameDesc": "添加角色", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }, { "path": "/setting/roleauthmanager/edit/:roleId", "id": 247, "parentId": 144, "name": null, "nameDesc": "编辑角色", "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": 0 }], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": null }, { "path": "/", "id": 236, "parentId": 0, "name": "首页", "nameDesc": null, "menus": [], "authButtonList": { "pageButtonList": [], "tableButtonList": [] }, "tabs": null, "selected": null }], "menuIds": [] }, "extraMsg": "" }
	const authMenu = { id: "root", menus: data.data.menus };
	// console.log(authMenu);
	const selectedKeys = new Set(["1", "2", "13"]);
	const selectedSet = new Set();

	function findMenusById(id, currentMenu) {
		console.log(currentMenu.id, id)
		if (currentMenu.id == id) {
			return currentMenu;
		}
		var theMenu = null;
		if (currentMenu.menus && currentMenu.menus.length) {
			for (var i in currentMenu.menus) {
				theMenu = findMenusById(id, currentMenu.menus[i]);
				if (theMenu) {
					return theMenu;
				}
			}
		}
		if (currentMenu.tabs && currentMenu.tabs.length) {
			for (var i in currentMenu.tabs) {
				theMenu = findMenusById(id, currentMenu.tabs[i]);
				if (theMenu) {
					return theMenu;
				}
			}
		}
		if (currentMenu.authButtonList && currentMenu.authButtonList.pageButtonList) {
			for (var i in currentMenu.authButtonList.pageButtonList) {
				theMenu = findMenusById(id, currentMenu.authButtonList.pageButtonList[i]);
				if (theMenu) {
					return theMenu;
				}
			}
		}
		if (currentMenu.authButtonList && currentMenu.authButtonList.tableButtonList) {
			for (var i in currentMenu.authButtonList.tableButtonList) {
				theMenu = findMenusById(id, currentMenu.authButtonList.tableButtonList[i]);
				if (theMenu) {
					return theMenu;
				}
			}
		}
		return null;
	}



	function setChildMenuIds(currentMenu, isDelete) {
		//const currentMenu = findMenusById(parentId, authMenu);
		if (isDelete) {
			selectedSet.delete(currentMenu.id);
		} else {
			selectedSet.add(currentMenu.id);
		}

		if (currentMenu.menus && currentMenu.menus.length) {
			for (var i in currentMenu.menus) {
				setChildMenuIds(currentMenu.menus[i], isDelete)
			}
		}
		if (currentMenu.tabs && currentMenu.tabs.length) {
			for (var i in currentMenu.tabs) {
				setChildMenuIds(currentMenu.tabs[i], isDelete)
			}
		}
		if (currentMenu.authButtonList && currentMenu.authButtonList.pageButtonList) {
			for (var i in currentMenu.authButtonList.pageButtonList) {
				setChildMenuIds(currentMenu.authButtonList.pageButtonList[i], isDelete)
			}
		}
		if (currentMenu.authButtonList && currentMenu.authButtonList.tableButtonList) {
			for (var i in currentMenu.authButtonList.tableButtonList) {
				setChildMenuIds(currentMenu.authButtonList.tableButtonList[i], isDelete)
			}
		}
	}


	selectedKeys.forEach(item => {
		var currentMenu = findMenusById(item, authMenu);
		setChildMenuIds(currentMenu);
	})
	console.log(selectedSet);
});



