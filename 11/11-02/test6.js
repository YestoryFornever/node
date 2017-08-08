let ejs = require('ejs');
let fs = require('fs');
let http = require('http');
let filename = './template/students.ejs';

let students = [
	{name: 'Rick',age:23},
	{name: 'Sarah',age:25},
	{name: 'Bod',age:37}
];

let server = http.createServer(function(req,res){
	if(req.url=='/'){
		fs.readFile(filename,function(err,data){
			let template = data.toString();
			let context = { students: students};
			let output = ejs.render(template,context);
			res.setHeader('Content-Type','text/html');
			res.end(output);
		});
	}else{
		res.statusCode = 404;
		res.end('Not Found');
	}
});
server.listen(8000);
console.log(8000);
