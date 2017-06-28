var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer((req,res)=>{
	switch(req.method){
		case 'POST':
			var item = '';
			req.setEncoding('utf-8');
			req.on('data',(chunk)=>{
				item += chunk;
			});
			req.on('end',()=>{
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			var body = items.map((item,i)=>{
				return i + ')' + item;
			}).join('\n');
			res.setHeader('Content-Length',Buffer.byteLength(body));
			res.setHeader('Content-Type','text/plain;charset="utf-8"');
			res.end(body);
			break;
		case 'DELETE':{
				let path = url.parse(req.url).pathname;
				let i = parseInt(path.slice(1),10);
				if(isNaN(i)){
					res.statusCode = 400;
					res.end('Invalid item id');
				}else if(!items[i]){
					res.statusCode = 404;
					res.end('Item not found');
				}else{
					items.splice(i,1);
					res.end('OK\n');
				}
			}
			break;
		case 'PUT':
			let path = url.parse(req.url).pathname;
			let i = parseInt(path.slice(1),10);
			if(isNaN(i)){
				res.statusCode = 400;
				res.end('Invalid item id');
			}else if(!items[i]){
				res.statusCode = 404;
				res.end('Item not found');
			}else{
				var item = '';
				req.setEncoding('utf-8');
				req.on('data',(chunk)=>{
					item += chunk;
				});
				req.on('end',()=>{
					console.log(i,items[i]);
					items.splice(i,1,item);
					res.end('OK\n');
				});
			}
			break;
	}
});
server.listen(9999);
console.log(9999);