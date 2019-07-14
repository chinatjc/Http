const http = require('http');

http.createServer(function(request, response) {
	console.log('request', request);
	console.log('request.url', request.url);

	response.end('123');
}).listen(9999);