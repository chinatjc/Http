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
	} else if (request.url === '/data4') {
		responseBody.content = 'success';
		responseBody.delay = 2000;
		// s-maxage 代理服务器缓存时间，没有s-maxage时，会把max-age时间当作s-maxage
		// max-age 浏览器缓存时间
		// private 只允许浏览器缓存，不允许代理服务器缓存
		// responseHead.options['cache-control'] = 'max-age=3, s-maxage=10, private';
		// no-store 浏览器、代理服务器都不缓存
		// responseHead.options['cache-control'] = 'max-age=3, s-maxage=10, no-store';
		responseHead.options['cache-control'] = 's-maxage=100';
		// vary 和 cache-control 字段一起配合使用
		// vary字段值对应的首部对应的字段值一样时，才使用缓存，否则不给予缓存
		responseHead.options['vary'] = 'x-cache-test';
	}

	response.writeHead(responseHead.code, responseHead.options)
	setTimeout(() => {
		response.end(responseBody.content);
	}, responseBody.delay);
}).listen(7777);
