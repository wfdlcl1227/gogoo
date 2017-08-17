'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer((request, response) => {
    console.log(request.method + ': ' + request.url);
    if (request.method === 'GET') {
        if (request.url === '/favicon.ico') {
            fs.createReadStream('./favicon.ico').pipe(response);
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html'});
            response.end('Welcome to my server!'); 
        }
    }
});

var serverPort = process.env.PORT || 5000;

server.listen(serverPort);

console.log('[Rocka Node Server] Running at http://127.0.0.1:${serverPort}/');