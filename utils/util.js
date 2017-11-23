

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
    }
};