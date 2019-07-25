const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	console.log(request.url);

	if (request.url === '/') {
		responseBody = fs.readFileSync('./index.html');
		responseHead.options['content-type'] = 'text/html';
	} else if (request.url === '/home') {
		// 307 临时重定向，不会把post请求变成get请求
		responseHead.code = 307;
		responseHead.options['location'] = '/';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
