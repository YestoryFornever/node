let connect = require('connect');
let app = connect();
app.use(logger);
app.use(hello);
app.listen(9999);
console.log(9999);

function logger(req,res,next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req,res) {
	res.setHeader('Content-Type','text/plain');
	res.end('hello world');
}