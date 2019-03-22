//异步编程
/**
 * 回调函数
//  */
// function f1(name) {
//     console.log('this is ' + name);
// }

// function f2(name, callback) {
//     console.log("this is f2!");
//     setTimeout(function () {
//         callback(name);
//     }, 2000);
// }

// f2("allen", f1);


// /**
//  * Promise
//  */

// (new Promise(function (resolve, reject) {
//     setTimeout(resolve, 4000, 100);
//     //reject(200);
// })).then(function (res) {
//     console.log(res);
// }, function (res) {
//     console.log(res);
// }).then(function (res) {
//     console.log('fasdf');
// }).catch(function (error) {
//     console.log("fsad:", error);
// });

(function () {

    const process = () => new Promise(resolve => {
        setTimeout(() => {
            resolve(1000);
        }, 1000)
    })

    async function fn() {
        for (var i = 0; i < 10; i++) {
            console.log(await process());
        }
        return "allen"
    }

    fn().then(res => {
        console.log(res);
    });
})()









