const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = {
		content: '',
		delay: 0
	};

	if (request.url === '/') {
		responseBody.content = fs.readFileSync('./index.html', 'utf-8');
		responseHead.options['content-type'] = 'text/html';
		responseHead.options['Strict-Transport-Security'] = 'Strict-Transport-Security: max-age=15552000; includeSubDomains; preload max-age=15552000';
	} else if (request.url === '/data4') {
		responseBody.content = 'success';
		responseHead.options['Connection'] = 'close';
	}

	response.writeHead(responseHead.code, responseHead.options)
	setTimeout(() => {
		response.end(responseBody.content);
	}, responseBody.delay);
}).listen(7777);
