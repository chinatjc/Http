const http = require('http');

http.createServer(function(request, response) {
	response.writeHead(200, {
		'content-type': 'text/plain',
		// 允许所有访问源来访问这个接口
		// 'Access-Control-Allow-Origin': '*',
		// 只允许 http://127.0.0.1:7777 域来访问这个接口
		'Access-Control-Allow-Origin': 'http://127.0.0.1:7777'
	});

	response.end('this is from server8888');
}).listen(8888);