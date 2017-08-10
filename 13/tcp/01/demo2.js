var net = require('net');

net.createServer(function(socket){
	socket.write('Hello World!\n');
	socket.end();
}).listen(1337);

console.log(1337);
