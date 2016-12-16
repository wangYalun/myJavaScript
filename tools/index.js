//常有方法
/**
 * @author wangYalun
 */
var o = {
    extend: function (obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    }
};

module.exports = o;