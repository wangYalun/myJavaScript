(function(){
    var a = 10000;
    var b = new String("allen");
    var c = {};
    //引用类型值
    function test_object(obj) {
        obj['haha'] = "haha";
    }
    //基本类型值
    function test(str) {
        str += " wang";
    }
    test(b);
    test_object(c);
    console.log(b);
    console.log(c);

    function millisecondToTime(micro_time) {
        var result = "";
        //var hours = parseInt(micro_time /(60 * 60 * 1000));
        var minutes = parseInt((micro_time) /(60 * 1000));
        var seconds = parseInt((micro_time - 60 * 1000 * minutes) /1000);
        var micro_s = parseInt((micro_time - 60 * 1000 * minutes - 1000 * seconds) / 10);

        // if (hours > 0) {
        //     result = (hours > 9 ? hours : "0" + hours) + ":";
        // } else {
        //     result = "00:";
        // }

        if (minutes > 0) {
            result += (minutes > 9 ? minutes : "0" + minutes) + ":";
        } else {
            result += "00:";
        }

        if (seconds > 0) {
            result += (seconds > 9 ? seconds : "0" + seconds)+":";
        } else {
            result += "00:";
        }

        if (micro_s > 0) {
            result += (micro_s > 9 ? micro_s : "0" + micro_s);
        } else {
            result += "00";
        }
        return result;
    }

    function millisecondsToString(milliseconds) {
        var oneHour = 3600000;
        var oneMinute = 60000;
        var oneSecond = 1000;
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var result;

        if (milliseconds >= oneHour) {
            hours = Math.floor(milliseconds / oneHour);
        }

        milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

        if (milliseconds >= oneMinute) {
            minutes = Math.floor(milliseconds / oneMinute);
        }

        milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

        if (milliseconds >= oneSecond) {
            seconds = Math.floor(milliseconds / oneSecond);
        }

        milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

        if (hours > 0) {
            result = (hours > 9 ? hours : "0" + hours) + ":";
        } else {
            result = "00:";
        }

        if (minutes > 0) {
            result += (minutes > 9 ? minutes : "0" + minutes) + ":";
        } else {
            result += "00:";
        }

        if (seconds > 0) {
            result += (seconds > 9 ? seconds : "0" + seconds);
        } else {
            result += "00";
        }

        return result;
    }
    var jxsj_time = 1476761177086;
    var i = setInterval(function () {
        var micro_time = jxsj_time - (+new Date());
        console.log(micro_time);
        console.log(millisecondToTime(micro_time));
    }, 100);
}); //立即调用表达式



(function(){

    // var obj={
    //     name:'allen',
    //     toString:function(){
    //         return 'bob';
    //     },
    //     valueOf:function(){
    //         return 'cici';
    //     }
    // }

    // with(obj){
    //     console.log(name);
    // }

    // console.log(new String(123));

    // var a=-10;

    // console.log((10-20)===a);

    // console.log(12.34213412341E-10);

    // console.log(Math.pow(9,1/2));

    // console.log(Math.max(1,12,3,4,5,6,3));

    // console.log()
    // console.log(obj+"");
    // console.log(obj.toString());
    // console.log(typeof (obj+""));

    // console.log(String(obj));


    undefined + ""; // "undefined"  
    null + ""; // "null" 
    true + ""; // "true" 
    "123" + ""; //"123" 
    100 + ""; //"100" 
    ({name:"allen"})+""; // "[object Object]" 

    function foo(){
        console.log("hello");
    }
    console.log(foo+"");

    var obj={
        name:'allen'
    };
    console.log(obj.toString());// "[object Object]"
    console.log(obj.valueOf());// "[object Object]"
    console.log(obj + "");// "[object Object]"
    obj.valueOf = function(){
        return 'cici';
    }
    obj.toString = function(){
        return 'bob';
    }
    console.log(obj + "");//bob
    
    console.log(obj + "");//cici

    console.log(String(undefined));

    function String(value){
        return value + "";
    }

    var num = 100;

    num.toString();



    Array.prototype.sort = function(){
        return this;
    }; //藏个某个角落的一段代码，修改了原生对象Array 的原型方法sort 

    var arr = [23,12,3,56,2];
    arr.sort();
    console.log(arr);// [23,12,3,56,2] 


});

(function(){
    var a=100;
    console.log(typeof a.toFixed(2));

    console.log(typeof String);

    var b=[1,2,3,4,5];

    console.log(String.toString());
});


(function(){

    var a={name:'allen',age:20};
    var json="";
    try{
        json=JSON.stringify(a);
    }catch(err){
        console.log(err);
    }

    json+="";

    try{
        console.log(JSON.parse(json));
    }catch(err){
        console.log(err);
    }
    
})();
