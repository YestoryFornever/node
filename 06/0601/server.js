let connect = require('connect');
connect()
.use(logger)
.use(restrict)
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

function restrict(req,res,next) {
	var authorization = req.headers.authorization;
	if(!authorization) return next(new Error('Unauthorized!'));
	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1],'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	authenticatedWithDataBase(user,pass,function(err){
		if(err) return next(err);
		next();
	});
}