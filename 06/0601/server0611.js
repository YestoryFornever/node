var url = require('url');
var connect = require('connect');

connect()
.use(rewrite)
.use(hello)
.listen(9999);
console.log(9999);

function hello(req,res) {
	res.setHeader('Content-Type','text/plain');
	res.end('hello world');
}

function rewrite(req,res,next){
	var path = url.parse(req.url).pathname;
	var match = path.match(/^\/blog\/posts\/(.+)/);
	if(match){
		findPostIdBySlug(match[1],function(err,id){//啥破玩意儿
			if(err) return next(err);
			if(!id) return next(new Error('User not found'));
			req.url = '/blog/posts/'+id;
			next();
		});
	}else{
		next();
	}
}