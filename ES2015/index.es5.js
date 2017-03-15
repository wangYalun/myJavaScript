"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//let,const

// var name="allen";

// while(true){
// 	var name="bob";
// 	break;
// }
// console.log(name);//bob

(function () {
	var _marked = [helloworldGenerator, f].map(regeneratorRuntime.mark);

	var name = "allen";

	while (true) {
		var _name = "bob";
		console.log(_name); //bob
		break;
	}
	console.log(name); //allen

	//ex 2
	//闭包解决
	var a = [];
	for (var i = 0; i < 10; i++) {
		a[i] = function (i) {
			return function () {
				console.log(i);
			};
		}(i);
	}
	a[6]();
	//let 解决

	var _loop = function _loop(_i) {
		a[_i] = function () {
			console.log(_i);
		};
	};

	for (var _i = 0; _i < 10; _i++) {
		_loop(_i);
	}
	a[6]();

	//const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。

	var PI = Math.PI;
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
	};
	var animal = new Animal();
	animal.say();

	function Dog() {
		this.name = "dog";
	}

	Dog.prototype = new Animal();

	//为子类添加原型方法，要放在继承之后。
	Dog.prototype.sayName = function () {
		console.log("I am a " + this.name);
	};

	var dog = new Dog();
	dog.say();
	dog.sayName();

	//ES2015 写法

	var AnimalES2015 = function () {
		function AnimalES2015() {
			_classCallCheck(this, AnimalES2015);

			this.type = "animal";
		}

		_createClass(AnimalES2015, [{
			key: "say",
			value: function say() {
				console.log("I am " + this.type);
			}
		}]);

		return AnimalES2015;
	}();

	var animal = new AnimalES2015();
	animal.say();

	var DogES2015 = function (_AnimalES) {
		_inherits(DogES2015, _AnimalES);

		function DogES2015() {
			_classCallCheck(this, DogES2015);

			var _this = _possibleConstructorReturn(this, (DogES2015.__proto__ || Object.getPrototypeOf(DogES2015)).call(this));

			_this.name = "dog";
			return _this;
		}

		_createClass(DogES2015, [{
			key: "sayName",
			value: function sayName() {
				console.log("I am a " + this.name);
			}

			//arrow function
			//当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
			//并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
			//它的this是继承外面的，因此内部的this就是外层代码块的this。

		}, {
			key: "intervalSayName",
			value: function intervalSayName() {
				var _this2 = this;

				setInterval(function () {
					console.log(_this2.name + ":" + +new Date());
				}, 1000);
			}
		}]);

		return DogES2015;
	}(AnimalES2015);

	var dog = new DogES2015();
	dog.say();
	dog.sayName();

	//箭头函数  arrow function

	var fun1 = function fun1(i) {
		return i + 1;
	}; //ES5 
	var funArrow = function funArrow(i) {
		return i + 1;
	}; //ES2015

	console.log(funArrow(1));

	var cat = "ken";
	//let dog='lili';
	var zoo = { cat: cat, dog: dog };

	//Generator 函数

	function helloworldGenerator() {
		return regeneratorRuntime.wrap(function helloworldGenerator$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return 'hello';

					case 2:
						_context.next = 4;
						return 'world';

					case 4:
						return _context.abrupt("return", 'ending');

					case 5:
					case "end":
						return _context.stop();
				}
			}
		}, _marked[0], this);
	}

	var hw = helloworldGenerator();

	hw.next(); //{value:'hello',done:false}
	hw.next(); //{value:'world',done:false}
	hw.next(); //{value:'ending',done:true}

	function f() {
		return regeneratorRuntime.wrap(function f$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						console.log('执行了');

					case 1:
					case "end":
						return _context2.stop();
				}
			}
		}, _marked[1], this);
	}

	var g = f();

	setInterval(function () {
		console.log(g.next());
	}, 1000);

	// 研究下 类方法里的 递归

	var Test = function () {
		function Test() {
			_classCallCheck(this, Test);
		}

		_createClass(Test, [{
			key: "fun",
			value: function fun() {
				console.log('TEST', this.num++);
				if (this.num == 10) {
					return;
				} else {
					this.fun();
				}
			}
		}], [{
			key: "getName",
			value: function getName() {
				return "allen";
			}
		}, {
			key: "staticFun",
			value: function staticFun() {
				console.log(this.getName());
			}
		}]);

		return Test;
	}();

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

	console.log(typeof Test === "undefined" ? "undefined" : _typeof(Test));
});

/**
 * 变量的解析赋值
 */
(function () {
	var _allen$bob = { allen: "allen", bob: 'bob' },
	    allen = _allen$bob.allen,
	    bob = _allen$bob.bob;

	console.log(allen);

	function Point() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		this.x = x;
		this.y = y;
	}

	new Point();

	function f(foo){
		console.log(foo);
		console.log(this.x);
	};

	function c(foo,callback){
		callback(foo);
	}

	c("Hello World",f.bind(new Point()));
})();
