(function () {

    function f() {
        console.log(this === global);
    }

    var o = { name: "allen" }
    var b = { name: "allen" }

    f.call(undefined);

    var Set = function () {

    }
    Set._v2s = function (val) {
        switch (val) {
            case undefined: return 'u';
            case null: return 'n';
            case true: return 't';
            case false: return 'f';
            default:
                switch (typeof val) {
                    case 'number': return '#' + val;
                    case 'string': return '"' + value;
                    default: return '@' + objectId(val);
                }
        }

        function objectId(o) {
            var prop = "|**objectid**|";
            if (!o.hasOwnProperty(prop)) {
                o[prop] = Set._v2s.next++;
            }
            return o[prop];
        }
    };

    Set._v2s.next = 100; //初始值ID的值

    console.log(Set._v2s(o));
    console.log(Set._v2s(b));
    console.log(o);
});
//2017-01-10
(function () {

    function Person() {

    }


    (function () {
        var nextid = 1;
        var idprop = "|personid|";

        Object.defineProperty(Person.prototype, "personId", {
            get: function () {
                if (!(idprop in this)) {
                    if (!Object.isExtensible(this)) {
                        throw Error("can\'t define id for nonextensible objects");
                    }
                    console.log("第一次获取personID");
                    Object.defineProperty(this, idprop, {
                        value: nextid++,
                        enumerable: false,
                        writable: false,
                        configurable: false
                    });
                }
                return this[idprop];
            },
            enumerable: false,
            configurable: false
        });
    })();

    


});

(function(){
    var s=setTimeout(function(){
        console.log('llll');
    },5000);
    clearTimeout(s);
})();

/**
 * Array
 */
(function(){
    var a=[];

    a.push('allen','bob');
    console.log(a);
    a.push('cici');
    // console.log(a);
    // console.log(a.pop());

    // a.unshift('di');
    // console.log(a);
    // console.log(a.shift());
    // console.log(a);
    console.log(a.reverse());
    console.log(a);
    console.log(a.splice(0,1));//返回删除的数组
    console.log(a.splice(0,0,'allen','bobo'));
    console.log(a);
    console.log(a.slice(0,1));

    a.every(function(item,index,array){
        
    });
})();