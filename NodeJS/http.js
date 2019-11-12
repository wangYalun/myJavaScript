/**
 * HTTP模块-学习笔记
 */

const http = require('http');

// console.log(http.STATUS_CODES['301']); 

http.createServer(function (request, response) {
    response.writeHead(200,{"Set-cookie"});
    response.write("503 Service Unavailable");
    response.end();
}).listen(8080)

