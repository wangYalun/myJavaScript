var ws = new WebSocket("ws://192.168.1.165:50168");

ws.onopen = function (evt) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};

ws.onmessage = function (evt) {
    console.log("Received Message: " + evt.data);
    ws.close();
};

ws.onclose = function (evt) {
    console.log("Connection closed.");
};   