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
		// GET 有缓存，POST 没有缓存

		// ------------------- 强缓存，不需要请求服务器 -------------------

		// responseBody = fs.readFileSync('./script.js', 'utf-8');
		// responseHead.options['content-type'] = 'text/javascript';


		// 缓存时间：60s，
		// max-age，出现于http1.1，最大缓存时间，相对时间，不受客户端本地时间控制

		// responseHead.options['cache-control'] = 'max-age=9999';



		// 缓存时间：1min
		// expires，http1.0提出的一个表示资源过期时间的header，缓存到期时间，绝对时间，受到客户端本地时间干扰

		// responseHead.options['expires'] = (new Date((new Date()).setMinutes((new Date()).getMinutes() + 10))).toGMTString();



		// max-age，expires 优先级比较，max-age优先级高，expires被忽略
		// responseHead.options['cache-control'] = 'max-age=5';

		// responseHead.options['expires'] = (new Date((new Date()).setMinutes((new Date()).getMinutes() + 1))).toGMTString();



		// ------------------- 协商缓存，需要请求服务器 -------------------

		// last-modified / if-modified-since，资源最后的修改日期
		// 无法体现出1秒内资源修改的状态

		// if (request.headers['if-modified-since']) {
		// 	responseHead.code = 304;
		// } else {
		// 	responseBody = fs.readFileSync('./script.js', 'utf-8');
		// 	responseHead.options['content-type'] = 'text/javascript';
		// 	responseHead.options['last-modified'] = new Date().toString();
		// }



		// etag / if-none-match，资源的实体标签

		// if (+request.headers['if-none-match'] === new Date().getMinutes()) {
		// 	responseHead.code = 304;
		// } else {
		// 	responseBody = fs.readFileSync('./script.js', 'utf-8');
		// 	responseHead.options['content-type'] = 'text/javascript';
		// 	responseHead.options['etag'] = new Date().getMinutes();
		// }



		// last-modified，etag 比较优先级
		// 貌似没有很合适的客观例子，，，，，，，，，

		// if (request.headers['if-modified-since'] || +request.headers['if-none-match'] === new Date().getMinutes()) {
		// 	responseHead.code = 304;
		// } else {
		// 	responseBody = fs.readFileSync('./script.js', 'utf-8');
		// 	responseHead.options['content-type'] = 'text/javascript';
		// 	responseHead.options['last-modified'] = new Date().toString();
		// 	responseHead.options['etag'] = new Date().getMinutes();
		// }



		// ------------------- 强缓存 -> 协商缓存 -------------------

		// 强缓存不满足条件时，向服务器发起请求，进行协商缓存

		// if (+request.headers['if-none-match'] === new Date().getMinutes()) {
		// 	responseHead.code = 304;
		// } else {
		// 	responseBody = fs.readFileSync('./script.js', 'utf-8');
		// 	responseHead.options['content-type'] = 'text/javascript';
		// 	responseHead.options['etag'] = new Date().getMinutes();
		// 	responseHead.options['cache-control'] = 'max-age=10';
		// }



		// ------------------- 浏览器启发式的算法 -------------------

		// 浏览器启发式的算法，max-age = (date_value - last-modified_value) * 10%
		// 根据浏览器启发式的算法，及时没有设置强缓存，也有10s的强缓存

		// responseBody = fs.readFileSync('./script.js', 'utf-8');
		// responseHead.options['content-type'] = 'text/javascript';

		// responseHead.options['date'] = new Date();
		// responseHead.options['last-modified'] = new Date(new Date().setSeconds( new Date().getSeconds() - 100 ));



		// 浏览器启发式算法的解决方案
		// 通过设置cache-control = no-cache，强制把缓存的验证交给原始服务器处理

		// responseBody = fs.readFileSync('./script.js', 'utf-8');
		// responseHead.options['content-type'] = 'text/javascript';

		// responseHead.options['date'] = new Date();
		// responseHead.options['last-modified'] = new Date(new Date().setSeconds( new Date().getSeconds() - 100 ));
		// responseHead.options['cache-control'] = 'no-cache';
	}

	response.writeHead(responseHead.code, responseHead.options)
	response.end(responseBody);
}).listen(7777);
