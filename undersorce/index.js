(function () {
    var root = this;

    //用void 0 代替 undefined

    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }



    //_.isArray=nativeIsArray||

    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function (value) {
                return func.call(context, value);
            };
            case 2: return function (value, other) {
                return func.call(context, value, other);
            };
            case 3: return function (value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function (accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function () {
            console.log(Infinity);
            return func.apply(context, arguments);
        };
    };

    var cb = function (value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    }

    //迭代
    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    }
    _.identity = function (value) {
        return value;
    }
    _.property = function (value) {
        return property(value);
    }

    // An internal function for creating assigner functions.
    var createAssigner = function (keysFunc, undefinedOnly) {
        return function (obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };
    //获取对象属性函数生成器
    var property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        }
    }
    var MAX_ARRARY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property("length");

    var isArrayLike = function (obj) {
        var length = getLength(obj);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRARY_INDEX;
    }



    // An internal function for creating a new object that inherits from another.
    var baseCreate = function (prototype) {
        if (!_.isObject(prototype)) return {};
        if (Object.create) return Object.create(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };

    _.each = _.forEach = function (obj, iteratee, context) {
        iteratee = iteratee.bind(context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = Object.keys(obj);
            for (i = 0, len = keys.length; i < len; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    }
    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = iteratee.bind(context);
        var keys = !isArrayLike(obj) && Object.keys(obj);

        var len = (keys || obj).length;

        var results = new Array(obj.length);
        for (var i = 0; i < len; i++) {
            var currentKey = keys ? keys[i] : i;
            results[i] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    }
    // 创建一个制造reduce的函数
    function createReduce(dir) {
        // Optimized iterator function as using arguments.length
        // in the main function will deoptimize the, see #1991.
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }

        return function (obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            // Determine the initial value if none is provided.
            if (arguments.length < 3) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            return iterator(obj, iteratee, memo, keys, index, length);
        };
    }

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    _.reduce = _.foldl = _.inject = createReduce(1);

    // The right-associative version of reduce, also known as `foldr`.
    _.reduceRight = _.foldr = createReduce(-1);



    _.invoke = function (obj, method) {
        var args = Array.prototype.slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            var func = isFunc ? method : value[method];
            return func == null ? null : func.apply(value, args);
        })
    }
    _.pluck = function (obj, key) {
        return _.map(obj, property(key));
    }

    _.filter = function (obj, predicate, context) {
        var results = [];
        predicate = optimizeCb(predicate, context);
        _.each(obj, function (item, index, arr) {
            if (predicate(item, index, arr)) results.push(item);
        });
        return results;
    }

    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negat(optimizeCb(predicate, context), context));
    }

    _.where = function (list, attrs) {
        return _.filter(list, _.matcher(attrs));
    }

    _.max = function (obj, predicate, context) {
        var result = -Infinity, lastComputed = -Infinity, value, computed;
        if (predicate == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, len = obj.length; i < len; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            predicate = cb(predicate, context);
            _.each(obj, function (value, index, list) {
                computed = predicate(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            })
        }
        return result;
    }

    _.shuffle = function (obj) {
        var set = isArrayLike(obj) ? obj : _.values(obj);
        var len = set.length;
        var shuffled = new Array(len);
        var rand;
        for (var i = 0; i < len; i++) {
            rand = _.random(0, i);
            if (rand !== i) shuffled[i] = shuffled[rand];
            shuffled[rand] = set[i];
        }
        return shuffled;
    }

    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (!isArrayLike(obj)) {
                obj = _.values(obj);
            }
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    }

    _.sortBy = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function (item, index, list) {
            return {
                value: item,
                index: index,
                criteria: iteratee(value, index, list)
            }
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    }

    _.partition = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [], fail = [];
        _.each(obj, function (item, index, list) {
            if (predicate(item, index, list)) {
                pass.push(item);
            } else {
                fail.push(item);
            }
        });
        return [pass, fail];
    }


    /**
     * 数组相关
     */
    _.last = function (arr, n, guard) {
        return _.rest(arr, arr.length - n);
    }

    _.rest = function (arr, n, guard) {
        return arr.slice(n);
    }


    /**
     * 函数相关
     */
    _.memoize = function (func, hasher) {
        var memoize = function (key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!_.has(cache, address)) {
                cache[address] = func.apply(this, arguments);
            }
            return cache[address];
        }
    }

    _.delay = function (func, wait) {
        var args = Array.prototype.slice.call(arguments, 2);

        return setTimeout(function () {
            func.apply(null, args);
        }, wait || 0);
    }

    _.throttle = function (func, wait, options) {
        var lastRunTime = 0;
        var throllted = function () {

            var now = +new Date();
            if (now - lastRunTime > wait) {
                func.apply(this, arguments);
                lastRunTime = now;
            }
        }
        return throllted;
    }

    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        }
    }

    _.before = function (times, func) {
        var memo;
        return function () {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            }
            if(times<1){
                
            }
        }
    }






    _.isMatch = function (obj, attrs) {
        var keys = _.keys(attrs), len = keys.length;
        if (obj == null) return !len;

        for (var i = 0; i < len; i++) {
            if (obj[keys[i]] !== attrs[keys[i]]) return false;
        }
        return true;
    }
    _.matcher = function (attrs) {
        return function (obj) {
            return _.isMatch(obj, attrs);
        }
    }


    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
    _.isFunction = function (obj) {
        return typeof obj === 'function' || false;
    }

    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var i in obj) {
            if (_.has(obj, i)) {
                keys.push(i);
            }
        }
        return keys;
    }
    _.values = function (obj) {
        var keys = _.keys(obj), len = keys.length;

        var values = new Array[len];
        for (var i = 0; i < len; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    }
    _.has = function (obj, key) {
        return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
    }

    _.negat = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        }
    }

    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 测试代码
     */
    console.log("*********自测代码-开始***********");

    var sum = _.reduce([1, 2, 3, 4, 5], function (prev, item) {
        return prev + item;
    });
    console.log(sum);

    console.log("*************自测代码-结束***************");


}).call(this);


