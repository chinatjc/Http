const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	console.log(request.headers.host);

	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	if (request.url === '/') {
		responseBody = fs.readFileSync('./index.html', 'utf-8');
		responseHead.options['content-type'] = 'text/html';
		// responseHead.options['Connection'] = 'close';
	} else {
		responseBody = fs.readFileSync('./t0120b2f23b554b8402.jpg');
		responseHead.options['content-type'] = 'image/jpg';
		// responseHead.options['Connection'] = 'close';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
