const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
	let responseHead = {code: 200, options: {}};
	let responseBody = '';

	if (request.url === '/') {
		responseBody = fs.readFileSync('./index.html', 'utf-8');
		responseHead.options['content-type'] = 'text/html';
		// HttpOnly 无法 通过document.cookie获取到对应字段；max-age cookie值的有效性
		// domain可以在二级域名下设置
		responseHead.options['set-cookie'] = ['name=123; HttpOnly', 'age=23;max-age=10', 'job3333=fe3333;domain=autohome.com.cn'];
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
