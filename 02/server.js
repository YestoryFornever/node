let http = require('http'),// http请求模块
	fs = require('fs'),// 文件操作模块
	path = require('path'),// 路径模块
	mime = require('mime'),// 消息类型
	cache = {};// 缓存

let send404 = (response)=>{// 404
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('错误404: 资源未找到');
	response.end();
}

let sendFile = (response, filePath, fileContents)=>{// 输出文件
	response.writeHead(200,{'Content-Type':mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

let serveStatic = (response, cache, absPath)=>{// 缓存、输出逻辑
	if(cache[absPath]){
		sendFile(response, absPath, cache[absPath]);
	}else{
		fs.exists(absPath, (exists)=>{
			if(exists){
				fs.readFile(absPath, (err, data)=>{
					if(err){
						send404(response);
					}else{
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}else{
				send404(response);
			}
		});
	}
}

let server = http.createServer((request, response)=>{//创建http服务并定义默认主页
	let filePath = false;
	if(request.url == '/'){
		filePath = 'public/index.html';
	}else{
		filePath = 'public' + request.url;
	}
	let absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

server.listen(9999, ()=>{
	console.log("监听端口9999");
});

let chatServer = require('./lib/chat_server');// 引入websocket服务
chatServer.listen(server);