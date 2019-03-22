(function () {
    const reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;
    const queryText = "哈哈，呵呵"
    console.log(queryText.split(reg));

    function getSameStr(str1, str2) {
        var textArray = [];
        var max = str1.length > str2.length ? str1 : str2;
        var min = (max == str1 ? str2 : str1);
        for (var i = 0; i < min.length; i++) {
            for (var x = 0, y = min.length - i; y != min.length + 1; x++ , y++) {
                //y表示所取字符串的长度
                var newStr = min.substring(x, y);
                //判断max中是否包含newStr
                if (new RegExp(newStr, "i").test(max)) {
                    textArray.push(newStr);
                }
            }
        }
        return textArray;
    }

    var str1 = "WEI";
    var str2 = "wei维也纳 国际酒店 ";
    console.log(getSameStr(str1, str2));
});

(function () {
    class Middleware {
        constructor() {
            this.cache = [];
        }
        use(fn) {
            if (typeof fn !== 'function') {
                throw 'middleware must be a function';
            }
            this.cache.push(fn);
            return this;
        }

        next(...arg) {
            if (this.middlewares && this.middlewares.length > 0) {
                var ware = this.middlewares.shift();
                arg.push(this.next.bind(this));
                ware.apply(this, arg);
            }
        }

        handleRequest(...arg) {//执行请求  
            this.middlewares = this.cache.map(function (fn) {//复制  
                return fn;
            });
            this.next.apply(this, arg);
        }

        authRequeste(options) {

            setTimeout(() => {
                this.handleRequest({ name: 'allen' });
            }, 1000)

        }

    }

    function addAge(res, next) {
        next({ ...res, age: 20 })
    }

    function json(res, next) {
        next(JSON.stringify(res));
    }

    function handleResult() {

    }

    var middleware = new Middleware();


    middleware.use(addAge);

    middleware.use(json);



    middleware.authRequeste();


    let promise = new Promise(resolve => {
        setTimeout(() => {
            resolve({ name: "allen" });
        }, 1000);
    });

    promise.then(res => {
        console.log(res);
    })

    promise.then(res => {
        return { ...res, age: 20 }
    })

    promise.then(res => {
        console.log(res)
    })






});
(function () {
    class MarkerList {

        constructor() {
            this.markers = [
                { id: 2 },
                { id: 1 },
                { id: 3, },
                { id: 8 }
            ]
        }

        getLastId() {
            const orderMarkers = this.markers.map(item => item.id).sort((a, b) => a - b);
            console.log(orderMarkers);

            let nextId = 1;
            for (let i = 0, len = orderMarkers.length; i < len; i++) {
                if ((orderMarkers[i] - nextId) >= 1) {
                    break;
                } else {
                    nextId = orderMarkers[i] + 1;
                }
            }
            return nextId;

        }
        add() {
            const marker = { id: this.getLastId() }
            this.markers.push(marker);
        }
    }

    const markerList = new MarkerList();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    markerList.add();
    console.log(markerList.markers);
})()