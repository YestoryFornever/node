let connect = require('connect');

let hello = (req,res)=>{
	res.setHeader('Content-Type','text/plain');
	res.end('Hello\n');
};

let app = connect()
.use(require('connect-logger')({
	format:"%date %status %method %url (%route - %time)",
	date:"YYYY-MM-DD HH:mm:ss"
}))
.use(hello)
.listen(9999);
console.log(9999);

/*function hello (req,res) {
	res.setHeader('Content-Type','text/plain');
	res.end('Hello\n');
}*/