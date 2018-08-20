var _ = require('./underscore.js');

var _my = require('./index.js');

//_.each({ name: "allen" } );


var funBind = function (func, context) {
    return function () {
        return func.apply(context, arguments);
    }
}



var obj = { name: "allen", age: 20 };

var func = funBind(function (value, value2) {
    console.log(this.name);
    console.log(value);
    console.log(value2);
}, obj);

var func2 = (function (value) {
    console.log(value);
}).bind(obj);


func("good", "hahfas");
func2("func2");

_my.each(obj, function (item, index) {
    console.log(`${index}:${item}`);
});

var objMapResult = _.map("allen", function (item, index) {
    return item + "map";
});

var myMapResult = _my.map(obj, function (item, index) {
    return `${index}:` + item + "my"
})
console.log(objMapResult);
console.log(myMapResult);


function test() {
    var args = Array.prototype.slice.call(arguments, 2);
    console.log(args);
}

var arrNum = [1, 2, 3, 4, 5];

console.log(arrNum.reduce(function (prev, current) {
    return prev + current;
}));

var obj2 = [{ name: "allen" }, { name: "bob", age: 20 }, { name: "cici" }];



console.log(_my.pluck(obj2, "name"));

console.log(_my.where(obj2, { name: "bob" }));

console.log(_my.reject(arrNum, function (item) { return !(item % 2) }));

console.log(_my.max(arrNum));

console.log(_my.shuffle(arrNum));

console.log(_.rest(arrNum, 2));
console.log(_my.rest(arrNum, 2));

console.log(_.last(arrNum, 2));
console.log(_my.last(arrNum, 2));


var arrNum2 = [-1, -2, 2, 3, 4, 5, 6, 7];

console.log(_.uniq(arrNum2, function (value) { return Math.pow(value, 2) }));

var fibonacci = _.memoize(function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(50));

function fn2(value) {
    console.log("delay-test", value);
}

var fn1 = _my.after(3, function () {
    console.log(Array.prototype.slice.call(arguments));
});


_.delay(fn1, 1000, '1,ni hao a');
_.defer(fn1, '2,ni hao a');

_my.delay(fn1, 2000, '3,ni hao a');


//setInterval(_.throttle(function () { console.log(+new Date()) }, 1000));

var fn3 = _.before(3, function (value) {
    console.log(value);
});

var fn4 = _.once(function (value) {
    console.log(value);
});

fn4(100);
fn4(100);
fn4(100);

fn3(3)
fn3(4)
fn3(5)
fn3(6)










