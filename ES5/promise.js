
// var promise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve('Hello ');
//     }, 10000);

//     reject('fasdf')

// });

// promise.then(function (res) {
//     console.log(res);
// }, function (err) {
//     console.log(err);
// });
(function (window, undefined) {

    var PENDING = undefined, FULFILLED = 1, REJECTED = 2;

    var isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }

    var isThenable = function (obj) {
        return obj && typeof obj['then'] === 'function';
    }


    var transition = function (status, value) {
        var promise = this;
        if (promise._status !== PENDING) return;
        setTimeout(function () {
            promise._status = status;
            publish.call(promise, value);
        });
    }

    var publish = function (val) {

        var promise = this,
            fn,
            st = promise._status === FULFILLED,
            queue = promise[st ? '_resolves' : '_rejects'];

        while (fn = queue.shift()) {
            val = fn.call(promise, val) || val;
        }

        promise[st ? '_value' : '_reason'] = val;
        promise['_resolves'] = promise['_rejects'] = undefined;
    }

    function MyPromise(resolver) {
        if (typeof resolver !== 'function') {
            throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
        }
        if (!(this instanceof MyPromise)) {
            return new MyPromise(resolver);
        }

        var promise = this;
        promise._value;
        promise._reason;
        promise._status = PENDING;
        promise._resolves = [];
        promise._rejects = [];

        var resolve = function (value) {
            transition.apply(promise, [FULFILLED].concat([value]));
        }

        var reject = function (reason) {
            transition.apply(promise, [REJECTED].concat([reason]));
        }

        resolver(resolve, reject);
    }

    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var promise = this;

        // 每次返回一个promise，保证是可thenable的

        return new MyPromise(function (resolve, reject) {

            function callback(value) {
                var ret = isFunction(onFulfilled) && onFulfilled(value) || value;

                if (isThenable(ret)) {
                    ret.then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        reject(reason);
                    });
                } else {
                    resolve(ret);
                }
            }

            function errback(reason) {
                reason = isFunction(onRejected) && onRejected(reason) || reason;
                reject(reason);
            }

            if (promise._status === PENDING) {
                promise._resolves.push(callback);
                promise._rejects.push(errback);
            } else if (promise._status === FULFILLED) { // 状态改变后的then操作，立刻执行
                callback(promise._value);
            } else if (promise._status === REJECTED) {
                errback(promise._reason);
            }
        });
    }


    MyPromise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    }

    MyPromise.prototype.delay = function (ms, val) {
        return this.then(function (ori) {
            return MyPromise.delay(ms, val || ori);
        });
    }



    MyPromise.delay = function (ms, val) {

        return MyPromise(function (resolve, reject) {
            setTimeout(function () {
                resolve(val);
            }, ms);

        });

    }



    MyPromise.resolve = function (arg) {
        return MyPromise(function (resolve, reject) {
            resolve(arg);
        });
    }



    MyPromise.reject = function (arg) {
        return MyPromise(function (resolve, reject) {
            reject(arg);
        })
    }



    MyPromise.all = function (promises) {
        if (!isArray(promises)) {
            throw new TypeError('You must pass an array to all.');
        }
        return Promise(function (resolve, reject) {
            var i = 0,
                result = [],
                len = promises.length,
                count = len;

            function resolver(index) {
                return function (value) {
                    resolveAll(index, value);
                };
            }

           function rejecter(reason) {
                reject(reason);
            }

            function resolveAll(index, value) {
                result[index] = value;
                if (--count == 0) {
                    resolve(result)
                }
            }



            for (; i < len; i++) {
                promises[i].then(resolver(i), rejecter);
            }

        });

    }



    MyPromise.race = function (promises) {
        if (!isArray(promises)) {
            throw new TypeError('You must pass an array to race.');
        }

        return MyPromise(function (resolve, reject) {
            var i = 0,
                len = promises.length;

            function resolver(value) {
                resolve(value);
            }

            function rejecter(reason) {
                reject(reason);
            }

            for (; i < len; i++) {
                promises[i].then(resolver, rejecter);
            }
        });

    }

    window.MyPromise = MyPromise;

})(window);




