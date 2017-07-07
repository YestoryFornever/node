let connect = require('connect');
let basicAuth = require('basic-auth-connect');

connect()
.use(basicAuth('admin','password'))
.use((req,res)=>{
	res.end('Bye');
})
.listen(9999);
console.log(9999);