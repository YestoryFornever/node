/*var fs = require('fs');
var stream = fs.createReadStream('./mock.json')
stream.on('data',function(chunk){
	console.log(chunk);
});
stream.on('end',function(){
	console.log('finished');
});*/
var http = require('http');
var server = http.createServer();
server.on('request',function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Hello World\n');
})
server.listen(9999);
console.log('Server running at http://127.0.0.1:9999/');