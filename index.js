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