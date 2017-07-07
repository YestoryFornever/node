let connect = require('connect');
let cookieParser = require('cookie-parser');

connect()
.use(cookieParser('tobi is a cool ferret'))
.use((req,res)=>{
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.end('Hello\n');
})
.listen(9999);
console.log(9999);