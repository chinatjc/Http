const http = require('http');

http.createServer(function(request, response) {
	response.writeHead(200, {
		'content-type': 'text/plain',
		// 允许所有访问源来访问这个接口
		// 'Access-Control-Allow-Origin': '*',
		// 只允许 http://127.0.0.1:7777 域来访问这个接口
		'Access-Control-Allow-Origin': 'http://127.0.0.1:7777',
		// HTTP头信息不能超过一下这几种字段，否则需要在'Access-Control-Allow-Headers'里设置相应的字段
		// * Accept
		// * Accept-Language
		// * Content-Language
		// * Last-Event-ID
		// * Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
		'Access-Control-Allow-Headers': 'X-Test-Cors,Content-Type',
		// 跨域访问，默认只允许GET、POST、HEAD这三个方法，其他请求方法需要通过'Access-Control-Allow-Methods'头部来设置
		'Access-Control-Allow-Methods': 'PUT',
		// 预请求结果缓存时间
		'Access-Control-Max-Age': '3'
	});

	response.end('this is from server8888');
}).listen(8888);