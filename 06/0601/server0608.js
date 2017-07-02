let connect = require('connect');
connect()
.use(setup('错误！:method :url :error'))
.use(hello)
.listen(9999);
console.log(9999);

function logger(req,res,next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req,res) {
	res.setHeader('Content-Type','text/plain');
	res.end('hello world');
}

function setup(format){
	var regexp = /:(\w+)/g;
	return function logger(req,res,next){
		var str = format.replace(regexp,function(match,property){
			return req[property]
		});
		console.log(str);
		next();
	}
}