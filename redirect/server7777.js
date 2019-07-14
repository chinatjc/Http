const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	console.log(request.url);

	if (request.url === '/') {
		responseBody = zlib.gzipSync(fs.readFileSync('./index.html'));
		responseHead.options['content-encoding'] = 'gzip';
		responseHead.options['content-type'] = 'text/html';
	} else if (request.url === '/home') {
		// 301 永久重定向
		responseHead.code = 301;
		responseHead.options['location'] = '/';
	} else if (request.url === '/page') {
		// 302 临时重定向
		responseHead.code = 302;
		responseHead.options['location'] = '/';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
