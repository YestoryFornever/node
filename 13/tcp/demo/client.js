var net = require('net');
var host = process.argv[2];//从命令行参数中解析主机和端口号
var port = Number(process.argv[3]);

var socket = net.connect(port,host);//创建socket实例并开始链接服务器

socket.on('connect',function(){
	process.stdin.pipe(socket);//将进程的stdin传给socket
	socket.pipe(process.stdout);//将socket的数据传给进程的stdout
	process.stdin.resume();//在stdin上调用resume(),开始读取数据
});
socket.on('end',function(){
	process.stdin.pause();
});
