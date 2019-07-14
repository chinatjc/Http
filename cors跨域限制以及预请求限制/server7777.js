const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	const html = fs.readFileSync('./index.html', 'utf-8');

	response.writeHead(200, {
		'content-type': 'text/html'
	})
	response.end(html);
}).listen(7777);
