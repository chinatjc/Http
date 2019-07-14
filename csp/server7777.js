const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	if (request.url === '/') {
		responseBody = zlib.gzipSync(fs.readFileSync('./index.html'));
		responseHead.options['content-encoding'] = 'gzip';
		responseHead.options['content-type'] = 'text/html';
		// 只有允许http https方式请求资源，才能运行
		// responseHead.options['content-security-policy'] = 'default-src http: https:';
		// 只允许加载本域内的资源
		// responseHead.options['content-security-policy'] = 'default-src \'self\'';
		// 只允许加载本域内的资源、https://hm.baidu.com内的资源
		// responseHead.options['content-security-policy'] = 'default-src \'self\' https://hm.baidu.com';
		// 只允许加载本域内的js、https://hm.baidu.com内的js，其他资源不受影响
		// responseHead.options['content-security-policy'] = 'script-src \'self\' https://hm.baidu.com';
		// 通过report-uri 上报阻止的信息
		responseHead.options['content-security-policy'] = 'script-src \'self\' https://hm.baidu.com; report-uri /report';
	} else if (request.url.includes('.js')) {
		responseHead.options['content-type'] = 'application/javascript';
		responseBody = 'console.log("this is outer javascript")';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
