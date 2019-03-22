
//@flow

export default {
    getSessionStorage: function (item) {
        return JSON.parse(sessionStorage.getItem(item));
    },
    setSessionStorage: function (item, obj) {
        sessionStorage.setItem(item, JSON.stringify(obj));
    },
    getLocalStorage: function (item) {
        return JSON.parse(localStorage.getItem(item));
    },
    removeSessionStorage: function (item) {
        sessionStorage.removeItem(item);
    },
    setLocalStorage: function (item, obj) {
        // return JSON.parse(localStorage.getItem(item));
        localStorage.setItem(item, JSON.stringify(obj));
    },
    removeLocalStorage: function (item) {
        localStorage.removeItem(item);
    },
    getQueryStringArgs: function () {
        var qs = (window.location.search.length > 0 ? window.location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            name = item[0];
            value = item[1];
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    },
    serialize: function (obj) {
        var parts = [];
        for (var i in obj) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
        return parts.join("&");
    },
    extend: function (a, obj) {
        if (typeof a !== 'object')
            return a;
        for (var i in obj) {
            a[i] = obj[i];
        }
        return a;
    },
    //设置cookie
    setCookie(name, value, expires, path, domain) {
        var cookieStr = "";

        if (name) {
            cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        } else {
            return;
        }
        if (expires instanceof Date) {
            cookieStr += ";expires=" + expires.toGMTString();
        }
        if (path) {
            cookieStr += ";path=" + path;
        }
        if (domain) {
            cookieStr += ";domain=" + domain;
        }
        document.cookie = cookieStr;
    },
    deleteCookie(name, path, domain) {
        this.setCookie(name, "unset", new Date(0), path, domain);
    },
    getCookie(name) {
        var name = encodeURIComponent(name) + "=",
            start = document.cookie.indexOf(name),
            value = null;
        if (start > -1) {
            var end = document.cookie.indexOf(';', start);
            if (end === -1) {
                end = document.cookie.length;
            }
            value = decodeURIComponent(document.cookie.substring(start + name.length, end));
        }
        return value;
    },
    /**
     * 前端导出CSV
     */
    exportCsv: function (obj) {
        //title ["","",""]
        var title = obj.title;
        //titleForKey ["","",""]
        var titleForKey = obj.titleForKey;
        var data = obj.data;
        var str = [];
        str.push(obj.title.join(",") + "\n");
        for (var i = 0; i < data.length; i++) {
            var temp = [];
            for (var j = 0; j < titleForKey.length; j++) {
                temp.push(data[i][titleForKey[j]]);
            }
            str.push(temp.join(",") + "\n");
        }
        var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(str.join(""));
        var downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = "export.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    },
    /**
     * 
     * @param {Number|String} micro_time 
     * @param {String} format
     * @return {String} 
     */
    millisecondToTime(micro_time, format) {
        var result = "";
        var left = micro_time;
        if (/hh/i.test(format)) {
            var hours = parseInt((left) / (60 * 60 * 1000));
            left = left - (60 * 60 * 1000 * hours);

            if (hours > 0) {
                result += (hours > 9 ? hours : "0" + hours);
                //str = (minutes > 9 ? minutes : "0" + minutes) + "";
            } else {
                result += "00";
            }
            if (/mm/i.test(format)) {
                result += ":";
            }
        }
        if (/mm/i.test(format)) {
            var minutes = parseInt((left) / (60 * 1000));
            left = left - (60 * 1000 * minutes);

            if (minutes > 0) {
                result += (minutes > 9 ? minutes : "0" + minutes);
                //str = (minutes > 9 ? minutes : "0" + minutes) + "";
            } else {
                result += "00";
            }
            if (/ss/i.test(format)) {
                result += ":";
            }
        }
        if (/ss/i.test(format)) {
            var seconds = parseInt(left / 1000);
            left = left - seconds * 1000;

            if (seconds > 0) {
                result += (seconds > 9 ? seconds : "0" + seconds);
            } else {
                result += "00";
            }
            if (/\./i.test(format)) {
                result += ".";
            }
        }
        if (/\./i.test(format)) {
            var micro_s = parseInt(left / 10);
            if (micro_s > 0) {
                result += (micro_s > 9 ? micro_s : "0" + micro_s) + "";
            } else {
                result += "00";
            }
        }

        return result;
    },
    cmp(x, y) {
        // If both x and y are null or undefined and exactly the same 
        if (x === y) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects 
        if (!(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }

        //They must have the exact same prototype chain,the closest we can do is
        //test the constructor. 
        if (x.constructor !== y.constructor) {
            return false;
        }

        for (var p in x) {
            //Inherited properties were tested using x.constructor === y.constructor
            if (x.hasOwnProperty(p)) {
                // Allows comparing x[ p ] and y[ p ] when set to undefined 
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal 
                if (x[p] === y[p]) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal 
                if (typeof (x[p]) !== "object") {
                    return false;
                }

                // Objects and Arrays must be tested recursively 
                if (!Object.equals(x[p], y[p])) {
                    return false;
                }
            }
        }

        for (p in y) {
            // allows x[ p ] to be set to undefined 
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    }
};