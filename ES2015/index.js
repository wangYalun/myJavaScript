//let,const

// var name="allen";

// while(true){
// 	var name="bob";
// 	break;
// }
// console.log(name);//bob

(function () {


	let name = "allen";

	while (true) {
		let name = "bob";
		console.log(name); //bob
		break;
	}
	console.log(name); //allen

	//ex 2
	//闭包解决
	var a = [];
	for (var i = 0; i < 10; i++) {
		a[i] = (function (i) {
			return function () {
				console.log(i);
			}
		})(i);
	}
	a[6]();
	//let 解决

	for (let i = 0; i < 10; i++) {
		a[i] = function () {
			console.log(i);
		}
	}
	a[6]();

	//const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。

	const PI = Math.PI;
	//const jQuery=require("jQuery");

	console.log(PI);

	//类，继承，原型，构造函数

	/**
	*ES5 写法
	**/
	//构造函数
	function Animal() {
		this.type = "animal";
	}
	//原型方法
	Animal.prototype.say = function () {
		console.log("I am " + this.type);
	}
	var animal = new Animal();
	animal.say();

	function Dog() {
		this.name = "dog";
	}

	Dog.prototype = new Animal();

	//为子类添加原型方法，要放在继承之后。
	Dog.prototype.sayName = function () {
		console.log("I am a " + this.name);
	}

	var dog = new Dog();
	dog.say();
	dog.sayName();

	//ES2015 写法
	class AnimalES2015 {
		constructor() {
			this.type = "animal";
		}
		say() {
			console.log("I am " + this.type);
		}
	}
	var animal = new AnimalES2015();
	animal.say();
	class DogES2015 extends AnimalES2015 {
		constructor() {
			super();
			this.name = "dog";
		}
		sayName() {
			console.log("I am a " + this.name);
		}

		//arrow function
		//当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
		//并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
		//它的this是继承外面的，因此内部的this就是外层代码块的this。
		intervalSayName() {
			setInterval(() => {
				console.log(this.name + ":" + (+new Date()));
			}, 1000);
		}
	}

	var dog = new DogES2015();
	dog.say();
	dog.sayName();

	//箭头函数  arrow function

	var fun1 = function (i) { return i + 1; };//ES5 
	var funArrow = (i) => i + 1;//ES2015

	console.log(funArrow(1));

	let cat = "ken";
	//let dog='lili';
	let zoo = { cat, dog };

	//Generator 函数

	function* helloworldGenerator() {
		yield 'hello';
		yield 'world';
		return 'ending';
	}

	var hw = helloworldGenerator();

	hw.next(); //{value:'hello',done:false}
	hw.next(); //{value:'world',done:false}
	hw.next(); //{value:'ending',done:true}

	function* f() {
		console.log('执行了');
	}

	var g = f();

	setInterval(function () {
		console.log(g.next());
	}, 1000);


	// 研究下 类方法里的 递归

	class Test {
		static getName() {
			return "allen";
		}
		static staticFun() {
			console.log(this.getName());
		}
		fun() {
			console.log('TEST', this.num++);
			if (this.num == 10) {
				return;
			} else {
				this.fun();
			}
		}
	}

	var test = new Test();

	//test.fun();
	console.log();
	//实验结果
	//this 依然是指当前的对象TEST 0
	// TEST 1
	// TEST 2
	// TEST 3
	// TEST 4
	// TEST 5
	// TEST 6
	// TEST 7
	// TEST 8
	// TEST 9

	Test.staticFun();

	console.log(typeof Test);

	const bar = Symbol('bar');
	const snaf = Symbol('snaf');

	class myClass {
		// 公有方法
		foo(baz) {
			this[bar](baz);
		}

		// 私有方法
		[bar](baz) {
			return this[snaf] = baz;
		}
	};

	const c = new myClass();

	c.printName("allen");




});

/**
 * 变量的解析赋值
 */
(function () {
	const { allen, bob } = { allen: "allen", bob: 'bob' };
	console.log(allen);

	function Point(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	new Point();

	function f(foo) {
		console.log(foo);
		console.log(this.x);
	};

	function c(foo, callback) {
		callback(foo);
	}
	c("Hello World", f.bind(new Point()));
	c("Hello World", f.bind(new Point(), 'fasd'));

	const o = { name: "allen", age: 20 };

	o.name = 'bob';

	console.error(o);

	const str = `Allen,${o.name + " cici"}`;


	console.log(`${o}`);
	//Symbol
	let s = Symbol();

	o[s] = function () {
		console.log("symbol");
	}

	o[s]();
	//Set
	const ss = new Set();

	[2, 3, 4, 5, 23, 3, 3, 5].forEach(item => ss.add(item));

	ss.add(1).add(2);

	ss.delete(2);

	ss.has(2);

	ss.clear();

	console.log(ss);

	//数组去除重复对象

	var a = { name: 'allen' }, b = a;

	var array_1 = [a, b];
	console.log(array_1);
	var set_1 = new Set();
	set_1.add(a).add(b);
	console.log(set_1);

	var array_unique = Array.from(new Set(array_1));

	function unique(arr) {
		var _arr = [], _obj = {};
		for (var i = 0, len = arr.length; i < len; i++) {
			if (!_obj[arr[i]]) {
				_arr.push(arr[i]);
			}
		}
		return _arr;
	}

	function unique2(arr) {
		var _arr = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			if (_arr.indexOf(arr[i]) < 0) {
				_arr.push(arr[i]);
			}
		}
		return _arr;
	}

	console.log(unique(array_1));
	console.log(unique2(array_1));
	console.log(array_unique);
	//Proxy
	//set and get 拦截
	var proxy = new Proxy({ time: 2, _time: 2 }, {
		get: function (target, key, receiver) {
			//console.log(target, key, receiver);
			return Reflect.get(target, key, receiver);
		},
		set: function (target, key, value, receiver) {
			return Reflect.set(target, key, value, receiver);
		},
		has: function (target, key) {
			console.log('has');
			if (key[0] === '_') {
				return false;
			}
			return key in target;
		}
	});
	function foo() {
		return 'foo';
	}
	//apply 拦截，当对象是个函数时执行时
	var p = new Proxy(foo, {
		apply: function () {
			console.log('Proxy.apply');
			return Reflect.apply(...arguments);
		}
	});
	console.log(p());
	proxy.time = 1;
	proxy.time++;
	console.log(proxy.time);



	//has 拦截， 即拦截HasProperty.
	console.assert('time' in proxy, '_time is true');
	//has 拦截，对for...in 无效
	for (var key in proxy) {
		console.log(key, proxy[key]);
	}

	//Reflect

	var myObject = {
		name: "allen",
		age: 20,
		eat() {
			console.log('eat');
			return 'haha';
		},
		set setName(value) {
			this.name = value;
		}
	}

	var receiverObj = {
		name: "allen"
	}

	console.log(Reflect.get(myObject, 'name'));

	console.log(Reflect.get(myObject, 'eat')());
	Reflect.set(myObject, 'name', 'bob');
	Reflect.set(myObject, 'name', 'bob', receiverObj);
	console.log(myObject.name);
	console.log(receiverObj.name);

	console.assert(Reflect.has(myObject, 'name'), 'myObject has name');

	Reflect.deleteProperty(myObject, 'name');

	console.log(myObject.name);

	function Person(name) {
		this.name = name;
	}



	var person = new Person("allen");

	var person2 = new Person("bob");



	console.assert(Reflect.getPrototypeOf(person) === Person.prototype, 'heh');

	Reflect.setPrototypeOf(person, { getName: function () { return this.name } });

	console.log(person.getName());
	//console.log(person2.getName());



});

(function () {
	var promise = new Promise(function (resolve, reject) {

		var randomNum = ~~(Math.random() * 10 + 1);
		if (randomNum > 5) {
			resolve(randomNum);
		} else {
			reject(randomNum);
		}
	});
	//then 返回一个新的promise实例
	promise.then(function (num) {
		console.log("随机数字大于5：" + num);
		return ~~(Math.random() * 10 + 1);
	}, function (num) {
		console.log("随机数字小于等于5：" + num);
	}).then();


	var p1 = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('呵呵')
		}, 3000);
	});
	var p2 = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(p1);
		}, 1000);
	});

	p2.then((str) => { console.log('haha', str) });

	//Promise.prototype.then,Promise.protype.catch
	var p3 = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('hello Promise.prototype.then');
		}, 1000);
		//reject(new Error('p3 is error'));
	});

	p3.then((str) => {
		console.log(str);//hello Promise.prototype.then
		return "hello Promise.prototype.then step2";
	}).then((str) => { console.log(str); throw new Error('this is a error'); })
		.catch(error => { console.log(error) });


	//Promise.all

	var promises = [1, 2, 3, 4, 5].map((item, index) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(item);
		}, item * 1000);
	}));
	promises[0] = promises[0].then(res => res * 10);

	//Promise.all(promises).then(datas => { console.log(datas) }).catch(e => { console.log(e) });


	Promise.race(promises).then(datas => { console.log(datas) });






});

(function () {
	const fun = () => {
		console.log(this);
	}
	const fun2 = function () {
		console.log(this);
	}
	const obj = { name: "allen" };
	fun.call(obj);

	fun2.call(obj);
});

(function () {
	const a = b => c => {
		console.log("Hello");
		return "Hello";
	}
	const _a = function (_b) {

		return function (c) {
			console.log("Hello");
			return "Hello";
		}
	}
	a();
	_a();
});

(function () {
	function* gen(x, y) {

		var z = yield x;

		return z;
	}
	var myGen = gen(0, 1);
	console.log(myGen.next(0));
	console.log(myGen.next(2));

	function* fibonacci() {
		let [prev, curr] = [0, 1];
		for (; ;) {
			[prev, curr] = [curr, prev + curr];
			yield curr;
		}
	}

	for (let n of fibonacci()) {
		if (n > 1000) break;
		console.log(n);
	}



});

/**
 * Generator 函数
 */
(function () {

	//学习生成器Generator 函数之前，先了解迭代器(Iterator)

	let arr = [1, 2, 3];

	for (let item of arr) {
		console.log(item);
	}

	var helloworldGenerator = function* () {
		console.log("1");
		var first = yield "Hello";
		console.log("2");
		yield "World" + first;
		console.log("3");
		return "Allen";
	}

	function* demo() {
		// console.log('Hello' + yield); // SyntaxError
		// console.log('Hello' + yield 123); // SyntaxError

		console.log('Hello' + (yield)); // OK
		console.log('Hello' + (yield 123)); // OK
	}
	for (let item of helloworldGenerator()) {
		console.log(item)
	}
	const hello = helloworldGenerator();

	console.log(hello.next());
	console.log(hello.next("Allen"));
	console.log(hello.next());

	function* test() {
		console.log("Generator");
		return "Allen";
	}

	console.log(test().next());


	//Generator 函数的异步应用

	function* gen(x) {
		var y = yield x + 2;
		return y;
	}

	var g = gen(1);

	console.log(g.next());
	console.log(g.next(1));

	/**
	 * Thunk 函数
	 * 任何函数，只要有回调函数，就能写成Thunk函数的形式。
	 * 
	 */
	//ES5版本
	var Thunk = function (fn) {
		return function () {
			var args = Array.prototype.slice.call(arguments);
			return function (callback) {
				args.push(callback);
				return fn.apply(this, args);
			}
		}
	}

	const _Thunk = function (fn) {
		return function (...args) {
			return function (callback) {
				return fn.call(this, ...args, callback);
			}
		}
	}

	function f(a, cb) {
		cb(a);
	}

	const ft = Thunk(f);

	ft("allen Thunk")(console.log);

	//读文件为例
	var fs = require('fs');
	var thunkify = require('thunkify');

	var readFileThunk = thunkify(fs.readFile);

	var myGen = function* () {
		var r1 = yield readFileThunk('../package.json');
		console.log(r1.toString());
		var r2 = yield readFileThunk('../test.js');
		console.log(r2.toString());
	}
	//手动执行
	// var myG = myGen();
	// var r1 = myG.next();
	// r1.value(function (err, data) {
	// 	if (err) throw err;
	// 	var r2 = myG.next(data);
	// 	r2.value(function (err, data) {
	// 		if (err) throw err;
	// 		myG.next(data);
	// 	})
	// })


	/**
	 * 自动执行
	 */

	function run(fn) {
		var gen = fn();

		function next(err, data) {
			if (err) throw err;
			var result = gen.next(data);
			if (result.done) return;
			result.value(next);
		}

		next();
	}

	//run(myGen);
	var co = require('co');
	co(myGen);

});
/**
 * 基于Promise 对象的自动执行
 */
(function () {
	var fs = require('fs');

	var readFile = function (fileName) {
		return new Promise(function (resolve, reject) {
			fs.readFile(fileName, function (error, data) {
				if (error) return reject(error);
				resolve(data);
			})
		})
	}
	var gen2 = function* () {
		var r1 = yield readFile('../git_dev.js');
		console.log(r1.toString());
		var r2 = yield readFile('../debug.log');
		console.log(r2.toString());
	}

	//手动执行上面的Generator 函数
	// var g2 = gen2();
	// g2.next().value.then(function (data) {
	// 	//console.log(data.toString());
	// });
	// g2.next().value.then(function (data) {
	// 	console.log(data.toString());
	// })
	// // g2.next()

	// function run(gen) {
	// 	var g = gen();

	// 	function next(data) {
	// 		var result = g.next(data);
	// 		if (result.done) return result.value;
	// 		result.value.then(function (data) {
	// 			next(data);
	// 		})
	// 	}
	// 	next();
	// }
	// run(gen2);

	var co = require('co');

	co(gen2);

	co(function* () {
		var res = yield [
			Promise.resolve(1),
			Promise.resolve(2)
		];
		console.log(res)
	})
});

(function () {

	var p = new Promise(function (resolve, reject) {
		//fetch("https://localhost:8000").then(resolve);
		setTimeout(function () {
			//throw new Error("this is allen");
			resolve("resolve");
		}, 1000);
	})

	p.then(function (res) {
		// throw new Error("this is a error");
		return res + "then1";
	}).then(function (res) {
		console.log(res + "then2");
		return res + "then2";
	}).catch(function (error) {
		console.log(error);
		return "after catch error";
	}).then(function (res) {
		console.log(res);
	})

	var obj = {
		tex: "10人乘坐，ABCD",
		tok: "24.da3dbdb8069198c5509b873ee720bfe6.2592000.1539247312.282335-11372208",
		cuid: "allen",
		ctp: "1",
		lan: "zh",
		per: 0
	}

	var parts = [];
	for (var i in obj) {
		parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
	}
	var url = "https://tsn.baidu.com/text2audio?" + parts.join("&");

	console.log(url);




});

(function () {
	/**
	 * 学习了解async 函数
	 */
	// 我们一般的写法是 
	const co = require("co");
	const processFn = () => new Promise((resolve) => [
		setTimeout(() => {
			resolve("Hello" + Math.random());
		}, 1000)
	])

	function* printRandomNum() {
		const r1 = yield processFn();
		const r2 = yield processFn();
		console.log(r1);
		console.log(r2);
	}
	//co(gen);

	// 使用 async 函数写法

	const asyncPrintRandomNum = async function () {

		for (var i = 0; i < 10; i++) {
			console.log(await processFn());
		}

		const r1 = await processFn();
		return r1;
	}

	asyncPrintRandomNum().then(res => {
		console.log(res);
	});



});

/**
 *  Iterator 迭代器
 */
(function () {

	const obj = {
		[Symbol.iterator]() {
			return {
				next() {
					return {
						value: 1,
						done: true
					}
				}
			}
		}
	}


	for (var i of obj) {
		console.log(i);
	}

	class RangeIterator {
		constructor(start, stop) {
			this.value = start;
			this.stop = stop;
		}

		[Symbol.iterator]() { return this; }

		next() {
			var value = this.value;
			if (value < this.stop) {
				this.value++;
				return { done: false, value: value };
			}
			return { done: true, value: undefined };
		}
	}

	function range(start, stop) {
		return new RangeIterator(start, stop);
	}

	for (var value of range(0, 3)) {
		console.log(value); // 0, 1, 2
	}

	const str = "allen";
	const strArry = [...str];
	console.log(Array.prototype.slice.call(str));
	console.log(strArry);

	// 部署了Iterator 的数据结构包括 ,Array,Map,Set,String,TypedArray,函数的arguments对象，NodeList对象
	// 只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。 let arr = [...iterable]


	// iterator 最简单的实现

	const iteratorObj = {
		*[Symbol.iterator]() {
			for (let i = 0; i < 10; i++) {
				yield i;
			}
		}
	}

	for (let i of iteratorObj) {
		console.log(i);
	}

	const weakMap = new WeakMap();


	function fn() {
		const mapKey = {};
		weakMap.set(mapKey, { name: "allen" });
		console.log(weakMap.get(mapKey));
	}

	fn()



	// const mapObj = new Map([["name", "allen"], [{ name: "allen" }, "20"]]);
	// console.log(mapObj.get({ name: "allen" }));



});

(function () {
	class Marker {
		constructor(point, markerType, payload) {
			console.log(point, markerType, payload);
		}
	}

	const marker = new Marker(1, 2, 3);

	class UdianbusMarker extends Marker {
		constructor(point, markerType, payload) {
			super(point, markerType, payload);
		}
	}
	const udianbusMarker = new UdianbusMarker(1, 2, 3);

	const obj = { name: "allen", age: 20, sex: "man" };
	// const name = obj.name;
	const { name, age, sex } = obj;
	console.log(name);
});

(function(){
	
})()












