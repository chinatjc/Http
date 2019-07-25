const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	if (request.url === '/') {
		// responseBody = fs.readFileSync('./index.html');

		// gzip压缩
		responseBody = zlib.gzipSync(fs.readFileSync('./index.html'));
		responseHead.options['content-encoding'] = 'gzip';
		responseHead.options['content-type'] = 'text/html';
	} else {
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
