let app = require('http').createServer(handler);

let io = require('socket.io').listen(app);

let fs = require('fs');

let html = fs.readFileSync('index.html','utf8');

function handler (req,res){
	res.setHeader('Content-Type','text/html');
	res.setHeader('Content-Length',Buffer.byteLength(html,'utf8'));

	res.end(html);
}

function tick(){
	var now = new Date().toUTCString();
	io.sockets.send(now);
}

setInterval(tick,1000);

app.listen(8000);

console.log(8000);
