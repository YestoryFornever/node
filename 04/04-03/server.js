let http = require('http'),
	parse = require('url').parse,
	join = require('path').join,
	fs = require('fs');

let root = __dirname;

let server = http.createServer(( req, res )=>{
	let url = parse( req.url );
	let path = join( root, url.pathname );
	let stream = fs.createReadStream(path);
	/**普通方法
	 *stream.on('data',(chunk)=>{
		res.write(chunk);
	});
	stream.on('end',()=>{
		res.end();
	});*/
	//pipe 优化后的方法
	stream.pipe(res);
});
server.listen(9999);
console.log(9999);