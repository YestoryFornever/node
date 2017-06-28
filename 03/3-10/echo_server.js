var net = require('net');

var server = net.createServer((socket)=>{
	socket.once('data',(data)=>{
		socket.write(data);
	});
});
server.listen(8888);