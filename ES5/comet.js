
//方法一，基于HTTP流

function createStreamingClient(url, progress, finished) {
    var xhr = new XMLHttpRequest(),
        received = 0;

    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        var result;

        if (xhr.readyState == 3) {
            result = xhr.responseText.substring(received);
            received += result.length;

            progress(result);
        }else if(xhr.readyState==4){
            finished(xhr.responseText);
        }


    }
    xhr.send(null);
    return xhr;
}

//服务器发送时间
//SSE
var source = new EventSource("http://data.local.gaopeng.com/gpa/test");
source.onmessage=function(event){
    var data=event.data;
    console.log(data);
}

var client=createStreamingClient("http://data.local.gaopeng.com/gpa/test",function(res){
    console.log(res);
},function(res){
    console.log("Done!");
});


