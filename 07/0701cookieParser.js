let connect = require('connect');
let cookieParser = require('cookie-parser');

connect()
.use(cookieParser('tobi is a cool ferret'))
.use((req,res)=>{
	/*console.log(req.cookies);
	console.log(req.signedCookies);
	res.end('Hello\n');*/
	res.setHeader('Set-Cookie','foo=bar');
	res.setHeader('Set-Cookie','tobi=ferret;Expires=Tue, 08 Jun 2021 10:18:14 GMT');
	res.end();
})
.listen(9999);
console.log(9999);