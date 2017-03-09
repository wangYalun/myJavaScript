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


});

/**
 * 变量的解析赋值
 */
(function () {
	const {allen, bob} = { allen: "allen", bob: 'bob' };
	console.log(allen);
})();






