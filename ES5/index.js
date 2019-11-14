// var UUID=require('./UUID');
// (function(){
//     var d=new Date();
//     console.log(d.toJSON());

//     // for(var i=0;i<10;i++){
//     // 	var uuid=new UUID();
//     // 	console.log(uuid.toString());
//     // }

//     while(true){
//     	var micro_time = +new Date();
//     	var gpa_pvi = new String(micro_time);
//     	console.log(gpa_pvi.concat(new String(Math.floor(Math.random()*10))));
//     	//console.log(gpa_pvi.substr(-12));
//     }
// })();


//测试数组迭代函数

(function () {
    function Obj() {
        this.arr = [1, 5, 2, 6, 8];

        this.marked = [];

        this.fun = function () {
            this.arr.forEach(function (item, index, array) {
                //console.log(item);
                this.marked[index] = item;
                console.log(this.marked[index]);
                console.log(this);
            }, this);
        }
    }

    var o = new Obj();

    o.fun();
});
// 《编写高质量代码-改善JavaScript程序的188个建议》
(function () {
    function Person(name) {
        if (this instanceof Person) {
            this.name = name;
        } else {
            return new Person(name);
        }
    }
    function Student(name, age) {
        if (this instanceof Student) {
            Person.call(this, name);
            this.age = age;
        } else {
            return new Student(name, age);
        }
    }
    const s = new Student("allen", 20);
    console.log(s.name);
    console.log(s2.name);
    console.log(global.name);

    class PersonClass {
        constructor(x) {
            this.x = x;
        }
    }
    const p = new PersonClass(10);
    console.log(p.x);

    // 使用原型设置默认值
    // 使用原型实现数据备份

    Function.prototype.getName = function () {
        console.log("allen")
        return "allen";
    }
    function Allen() {
        return "allen"
    }



    const allen = new Allen();

    allen.getName();

});

// 整理面试题
(function () {
    function A() {
        this.x = [];
        this.y = 0;
    }
    function B() { }
    B.prototype = new A();
    var b1 = new B();
    var b2 = new B();
    b1.x.push(1);
    b1.y = 10;
    console.log(b2.x, b2.y);
})();



