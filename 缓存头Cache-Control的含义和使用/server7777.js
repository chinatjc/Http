const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	if (request.url === '/') {
		responseBody = fs.readFileSync('./index.html', 'utf-8');
		responseHead.options['content-type'] = 'text/html';
	}
	if (request.url === '/script.js') {
		responseBody = fs.readFileSync('./script.js', 'utf-8');
		responseHead.options['content-type'] = 'text/javascript';
		// 缓存时间：20s
		responseHead.options['cache-control'] = 'max-age=20';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
