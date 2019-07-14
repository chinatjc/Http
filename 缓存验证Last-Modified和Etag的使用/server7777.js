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
		if (request.headers['if-none-match'] === '22222') {
			responseBody = '1234';
			// 304 未修改 不返回body部分，直接从浏览器中获取body数据
			responseHead.code = 304;
		} else {
			responseBody = fs.readFileSync('./script.js', 'utf-8');
			responseHead.options['content-type'] = 'text/javascript';
			// 	no-cache 在使用缓存之前需要到源服务器验证缓存的有效性
			// responseHead.options['cache-control'] = 'max-age=20000, no-cache';
			// 	no-store 使用任何缓存数据，直接从源服务器拿到数据
			responseHead.options['cache-control'] = 'max-age=20000, no-store';
			// 最后一次修改时间
			responseHead.options['Last-Modified'] = '11111';
			// 文件的数字签名
			responseHead.options['Etag'] = '22222';
		}
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
