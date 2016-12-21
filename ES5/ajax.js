
var request = {};

// request.addURLParam = function (url, name, value) {
//     url += (url.index("?") == -1 ? "?" : "&");
//     url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
//     return url;
// }
// request.serialize = function (url, method, data) {
//     if (data instanceof FormData) {
//         return data;
//     }
//     var parts = [];
//     for (var i in data) {
//         parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
//     }

//     return method.toLocaleUpperCase() == "POST" ? parts.join("&") : url + "?" + parts.join("&");
// }
request.ajax = function (obj) {

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();//IE7+ 都支持

        var method, url, async, data, callback;
        method = obj.method || 'get';//请求方式
        url = obj.url;//请求URL
        if (!url) {
            console.log('url 错误');
            return;
        }
        async = obj.async || true;//是否异步
        data = obj.data || {}; //请求数据
        header = obj.header; //自定义头部数据
        callback = obj.callback;
        crossDomain = obj.callback || false;
        timeout = obj.timeout;
        //在调用opne之前指定 onreadystatechange
        if (async) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    exe();
                }
            };
        }
        if (method.toLocaleUpperCase() === "POST") {
            xhr.open("post", url, async);
            //如果不是表单数据
            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            setHeader(header);
            xhr.send(serialize(url, method, data));
        } else {
            xhr.open(method, serialize(url, method, data), async);
            //在opne 和send之间调用setRequestHeader 设置自定义头部信息
            setHeader(header);
            xhr.send(null);
        }

        if (!async) {
            exe();
        }
        function setHeader(header) {
            //如果是跨域请求，忽略设置header
            if(crossDomain){
                return;
            }
            if (url.indexOf('http://') > -1) {
                var domain = url.split("//")[1].split('/')[0];
                //console.log(domain);
                if (document.domain !== domain) {
                    return;
                }
            }

            if (header && typeof header === "object") {
                for (var i in header) {
                    xhr.setRequestHeader(i, header[i]);
                }
            }
        }
        function exe() {
            try {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    //console.log(xhr.getAllResponseHeaders());
                    if (callback) {
                        //默认返回json 格式数据
                        callback(JSON.parse(xhr.responseText));
                    }
                    if (async) {
                        resolve(JSON.parse(xhr.responseText));
                    }

                } else {
                    reject("Request was unsuccessful:" + xhr.status);
                    //console.log("Request was unsuccessful:" + xhr.status);
                }
            } catch (err) {
                //
            }
        }
    });
}
request.get = function (url, callback) {
    return this.ajax({
        url: url,
        callback: callback
    });
}
request.post = function (url, data, callback) {
    return this.ajax({
        url: url,
        method: 'post',
        data: data,
        callback: callback
    });
}

function addURLParam(url, name, value) {
    url += (url.index("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
function serialize(url, method, data) {
    //若是XMLHttpRequest2 级FormData 实例对象，可以直接发送
    if (data instanceof FormData) {
        return data;
    }
    var parts = [];
    for (var i in data) {
        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
    }
    if (parts.length === 0) {
        return method.toLocaleUpperCase() == "POST" ? "" : url;
    }
    return method.toLocaleUpperCase() == "POST" ? parts.join("&") : url + "?" + parts.join("&");
}

