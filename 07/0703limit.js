let connect = require('connect');
let bodyParser = require('body-parser');
let rawBody = require('raw-body');
connect()
.use(rawBody('32kb'))
.use(bodyParser.json())
.use((req,res)=>{
	res.end('Hello\n')
})
.listen(9999);
console.log(9999);