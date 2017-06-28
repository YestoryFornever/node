let http = require('http');
let items = [];

var server = http.createServer((req,res)=>{
	if('/'==req.url){
		switch(req.method){
			case 'GET':
				show(res);
				break;
			case 'POST':
				add(req,res);
				break;
			default:
				badRequest(res);
		}
	}else{
		notFound(res);
	}
});
server.listen(9999);
console.log(9999);

function show(res){
	let html = `<html><head><title>TodoList</title></head>
	<body>
		<h1>Todo List</h1>
		<ul>
		${items.map((item)=>{
			return '<li>'+item+'</li>'
		}).join('')}
		</ul>
		<form method="post" action="/">
			<p><input type="text" name="item"/></p>
			<p><input type="submit" value="Add"/></p>
		</form>
	</body>
	</html>`;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}
function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type','text/plain');
	res.end('Not Found');
}
function badRequest (res) {
	res.statusCode = 400;
	res.setHeader('Content-Type','text/plain');
	res.end('Bad Request');
}
let qs = require('querystring');
function add (req,res) {
	let body = '';
	req.setEncoding('utf-8');
	req.on('data',(chunk)=>{body+=chunk});
	req.on('end',()=>{
		let obj = qs.parse(body);
		items.push(obj.item);
		show(res);
	});
}