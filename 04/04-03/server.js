let http = require('http'),
	parse = require('url').parse,
	join = require('path').join,
	fs = require('fs');

let root = __dirname;

let server = http.createServer(( req, res )=>{
	let url = parse( req.url );
	let path = join( root, url.pathname );
	
	fs.stat(path,(err,stat)=>{
		if(err){
			if('ENOENT'==err.code){
				res.statusCode = 404;
				res.end('Not Found');
			}else{
				res.statusCode = 500;
				res.end('Internal Server Error');
			}
		}else{
			res.setHeader('Content-Length',stat.size);
			let stream = fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error',(err)=>{
				res.statusCode = 500;
				res.end('Internal Server Error');
			});
		}
	});
});
server.listen(9999);
console.log(9999);