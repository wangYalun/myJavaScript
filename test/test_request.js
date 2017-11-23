var request = require('request');


request('http://localhost:8081/api/notice?index=0&size=20', function (error, response, body) {
    console.log('error', error);
    //console.log('response', response);
    console.log('body', body);
});