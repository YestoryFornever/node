let connect = require('connect');

let api = connect()
	.use(users)
	.use(pets)
	.use(errorHandler);

let app = connect()
	.use(hello)
	.use('/api',api)
	.use(errorHandler)
	.listen(9999);
console.log(9999);

function hello(req,res,next) {
	if(req.url.match(/^\hello/)){
		res.end('Hello World!\n');
	}else{
		next();
	}
}

var db = {
	users:[
		{name:'tobi'},
		{name:'loki'},
		{name:'jane'}
	]
};

function users(req,res,next) {
	var match = req.url.match(/^\/user\/(.+)/);
	if(match){
		console.log(match[1]);
		var user = db.users[match[1]];
		console.log(db.users);
		if(user){
			console.log(1);
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify(user));
		}else{
			console.log(2);
			var err = new Error('User not found');
			err.notFound = true;
			next(err);
		}
	}else{
		next();
	}
}

function pets(req,res,next){
	if(req.url.match(/^\/pet\/(.+)/)){
		foo();
	}else{
		next();
	}
}

function errorHandler(err,req,res,next) {
	console.log(err.stack);
	res.setHeader('Content-Type','application/json');
	if(err.notFound){
		res.statusCode = 404;
		res.end(JSON.stringify({error:err.message}))
	}else{
		res.statusCode = 500;
		res.end(JSON.stringify({error:'Internal Server Error'}));
	}
}