let http = require('http');
let formidable = require('formidable');

var server = http.createServer((req,res)=>{
	switch(req.method){
		case 'GET':
			show(req,res);
			break;
		case 'POST':
			upload(req,res);
			break;
		default:
			badRequest(res);
	}
});
server.listen(9999);
console.log(9999);

function show(req,res){
	let html = `<html><head><title>Upload</title></head>
	<body>
		<form method="post" action="/" enctype='multipart/form-data'>
			<p><input type="text" name="name" /></p>
			<p><input type="file" name="file" /></p>
			<p><input type="submit" value="Upload"/></p>
		</form>
	</body>
	</html>`;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}
function upload(req,res){
	if(!isFormData(req)){
		res.statusCode = 400;
		res.end('Bad Request: expecting multipart/form-data');
		return;
	}
	let form = new formidable.IncomingForm();
	form.on('field',(field, value)=>{
		console.log(field);
		console.log(value);
	});
	form.on('file',(name,file)=>{
		console.log(name);
		console.log(file);
	});
	form.on('end',()=>{
		res.end('uploading complete!');
	});
	form.parse(req);
}
function isFormData (req) {
	let type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data');
}
function badRequest (res) {
	res.statusCode = 400;
	res.setHeader('Content-Type','text/plain');
	res.end('Bad Request');
}