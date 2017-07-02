let connect = require('connect');

connect()
.use(function hello(req,res){//默认错误处理
	foo();
	res.setHeader('Content-Type','text/plain');
	res.end('hello world');
})
.use(errorHandle())
.listen(9999);
console.log(9999);

function errorHandle() {
	let env = process.env.NODE_ENV || 'development';
	return function(err,req,res,next){
		console.log(env);
		res.statusCode = 500;
		switch(env){
			case 'development':
				res.setHeader('Content-Type','application/json');
				res.end(JSON.stringify(err));
				break;
			default:
				res.end('Server error');
		}
	}
}

