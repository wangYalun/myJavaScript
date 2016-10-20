(function () {
    var document = window.document;
    //辅助函数
    function getLocalStorage() {
        if (typeof localStorage === 'object') {
            return localStorage;
        } else {
            throw new Error('Local storage not available.');
        }
    }

    function getQueryStringArgs() {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
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
    }
    function UUID() {
        this.id = this.createUUID();
    }

    // When asked what this Object is, lie and return it's value
    UUID.prototype.valueOf = function () {
        return this.id;
    };
    UUID.prototype.toString = function () {
        return this.id;
    };

    //
    // INSTANCE SPECIFIC METHODS
    //
    UUID.prototype.createUUID = function () {
        //
        // Loose interpretation of the specification DCE 1.1: Remote Procedure Call
        // since JavaScript doesn't allow access to internal systems, the last 48 bits
        // of the node section is made up using a series of random numbers (6 octets long).
        //
        var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
        var dc = new Date();
        var t = dc.getTime() - dg.getTime();
        var tl = UUID.getIntegerBits(t, 0, 31);
        var tm = UUID.getIntegerBits(t, 32, 47);
        var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
        var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
        var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);

        // since detection of anything about the machine/browser is far to buggy,
        // include some more random numbers here
        // if NIC or an IP can be obtained reliably, that should be put in
        // here instead.
        var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
                UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
                UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
                UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
                UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
        return tl + tm + thv + csar + csl + n;
    };

    //Pull out only certain bits from a very large integer, used to get the time
    //code information for the first part of a UUID. Will return zero's if there
    //aren't enough bits to shift where it needs to.
    UUID.getIntegerBits = function (val, start, end) {
        var base16 = UUID.returnBase(val, 16);
        var quadArray = new Array();
        var quadString = '';
        var i = 0;
        for (i = 0; i < base16.length; i++) {
            quadArray.push(base16.substring(i, i + 1));
        }
        for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
            if (!quadArray[i] || quadArray[i] == '')
                quadString += '0';
            else
                quadString += quadArray[i];
        }
        return quadString;
    };

    //Replaced from the original function to leverage the built in methods in
    //JavaScript. Thanks to Robert Kieffer for pointing this one out
    UUID.returnBase = function (number, base) {
        return (number).toString(base).toUpperCase();
    };

    //pick a random number within a range of numbers
    //int b rand(int a); where 0 <= b <= a
    UUID.rand = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };

    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    //数据采集
    var platform_id = is_weixin() ? 10001 : 10004;
    var channel_id = 10000;
    var storage = getLocalStorage();

    if (!storage.getItem('access_uuid')) {
        var uuid = new UUID();
        storage.setItem('access_uuid', uuid.id);
    }
    var userinfo = {};
    if (storage.getItem('userinfo')) {
        userinfo = JSON.parse(storage.getItem('userinfo'));
    }
    var dataClient = {};
    dataClient.WEB_PATH = 'http://data.1.gaopeng.com';
    dataClient.init = function (window) {
        var it = this;
        //检测是否支持DOM2级事件
        var isSupported = document.implementation.hasFeature('HTMLEvents', '2.0');
        if (!isSupported)
            return;
        var postData = {
            title: document.title, //网页标题
            domain: document.domain, //网页域名
            url: document.URL, //网页URL
            referrer: document.referrer, //来源页面URL
            start_time: (new Date()).getTime() / 1000, //打开网页的时间
            uid: userinfo.uid || 0,
            username: userinfo.username || '',
            mobile: userinfo.mobile || '',
            platform_id: platform_id,
            channel_id: channel_id,
            track_id: storage.getItem('track') || getQueryStringArgs()['track'] || '',
            h5_version: '1.0.0',
            access_uuid: storage.getItem('access_uuid')
        };
        var loadEvent = function () {
            postData.title = document.title;
            postData.end_time = (new Date()).getTime() / 1000; //离开网页时时间

            it.ajax({
                method: 'post',
                url: it.WEB_PATH + '/api/api_receiver/access_h5',
                async: false,
                data: postData,
                callback: function (res) {
                    if (res === 'success')
                        console.log('成功接收');
                }
            });
        };
        var unloadEvent = function () {
            postData.title = document.title;
            postData.end_time = (new Date()).getTime() / 1000; //离开网页时时间

            it.ajax({
                method: 'post',
                url: it.WEB_PATH + '/api/api_receiver/access_h5',
                async: false,
                data: postData,
                callback: function (res) {
                    if (res === 'success')
                        console.log('成功接收');
                }
            });
        };
        window.addEventListener('load', loadEvent, false);

        //window.addEventListener('unload', unloadEvent, false);

    };
    dataClient.ajax = function (obj) {
        function createXHR() {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.ActiveXObject != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                            i, len;
                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //***
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
        /*
         method
         url,
         async,
         data,
         callback
         */
        function addURLParam(url, name, value) {
            url += (url.index("?") == -1 ? "?" : "&");
            url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
            return url;
        }
        function serialize(url, method, data) {
            if (data instanceof FormData) {
                return data;
            }
            var parts = [];
            for (var i in data) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
            }

            return method.toLocaleUpperCase() == "POST" ? parts.join("&") : url + "?" + parts.join("&");
        }
        var method, url, async, data, callback;
        method = obj.method;
        url = obj.url;
        async = obj.async;
        data = obj.data;
        callback = obj.callback;
        var xhr = createXHR();
        if (async) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    exe();
                }
            };
        }
        if (method.toLocaleUpperCase() === "POST") {
            xhr.open("post", url, async);
            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.send(serialize(url, method, data));
        } else {
            xhr.open(method, serialize(url, method, data), async);
            xhr.send(null);
        }

        if (!async) {
            exe();
        }
        function exe() {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                //console.log(xhr.getAllResponseHeaders());
                callback(xhr.responseText);
            } else {
                console.log("Request was unsuccessful:" + xhr.status);
            }
        }

    };
    dataClient.uaCheck = function () {
        //呈现引擎
        var engine = {
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,
            ver: null
        };

        //浏览器
        var browser = {
            //主要浏览器
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,
            ver: null
        };

        //平台，设备和操作系统
        var system = {
            win: false,
            mac: false,
            x11: false,
            //移动设备
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            nokiaN: false,
            winMobile: false,
            //游戏系统
            wii: false,
            ps: false
        };
        //检测呈现引擎和浏览器
        var ua = navigator.userAgent;
        if (window.opera) {
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
            engine.ver = RegExp['$1'];
            engine.webkit = parseFloat(engine.ver);

            //确定是Chrome 还是Safari
            if (/Chrom\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.chrome = parseFloat(browser.ver);
            } else if (/Versin\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.safari = parseFloat(browser.ver);
            } else {
                var safariVersion = 1;
                if (engine.webkit < 100) {
                    safariVersin = 1;
                } else if (engine.webkit < 312) {

                } else if (engine.webkit < 412) {
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }

                browser.safari = browser.ver = safariVersion;
            }
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp['$1'];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            engine.ver = RegExp['$1'];
            browser.firefox = parseFloat(browser.ver);
        } else if (/MSIE ([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp['$1'];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }

        //检测浏览器
        browser.ie = engine.ie;
        browser.opera = engine.opera;

        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf('Win') == 0;
        system.mac = p.indexOf('Mac') == 0;
        system.x11 = (p == 'X11') || (p.indexOf('Linex') == 0);

        //检测Windows操作系统
        if (system.win) {
            if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                if (RegExp['$1'] == 'NT') {
                    switch (RegExp['$2']) {
                        case '5.0':
                            system.win = '2000';
                            break;
                        case '5.1':
                            system.win = 'XP';
                            break;
                        case '6.0':
                            system.win = 'Vista';
                            break;
                        case '6.1':
                            system.win = '7';
                            break;
                        default:
                            system.win = 'NT';
                            break;
                    }
                } else if (RegExp['$1'] == '9x') {
                    system.win = 'ME';
                } else {
                    system.win = RegExp['$1'];
                }
            }
        }
        //移动设备
        system.iphone = ua.indexOf('iPhone') > -1;
        system.ipod = ua.indexOf('iPod') > -1;
        system.ipad = ua.indexOf('iPad') > -1;
        system.nokiaN = ua.indexOf('nokiaN') > -1;

        if (system.win == 'CE') {
            system.winMobile = system.win;
        } else if (system.win == 'Ph') {
            if (/Windows Phone OS (\d+.\d)/.test(ua)) {
                system.win == 'Phone';
                system.winMobile = pareseFloat(RegExp['$1']);
            }
        }

        if (system.mac && ua.indexOf('Mobile') > -1) {
            if (/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)) {
                system.ios = parseFloat(RegExp.$1.replace('_', '.'));
            } else {
                system.ios = 2;
            }
        }

        if (/Android (\d+\.\d+)/.test(ua)) {
            system.android = pareseFloat(RegExp.$1);
        }

        system.wii = ua.indexOf('Wii') > -1;
        system.ps = /playstation/i.test(ua);

        return {
            engine: engine,
            browser: browser,
            system: system
        };

    };
    dataClient.init(window);
})(window);


