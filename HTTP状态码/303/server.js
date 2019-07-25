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
		// 303 临时重定向，无论post请求还是get请求，都可以自动重定向
		responseHead.code = 302;
		responseHead.options['location'] = '/';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
