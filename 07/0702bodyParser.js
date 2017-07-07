let connect = require('connect');
let bodyParser = require('body-parser');

/*It means that using the bodyParser() constructor has been deprecated, as of 2014-06-19.

app.use(bodyParser()); //Now deprecated
You now need to call the methods separately

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
And so on.

If you're still getting a warning with urlencoded you need to use

app.use(bodyParser.urlencoded({
  extended: true
}));*/

connect()
.use(bodyParser.urlencoded({extended:true}))
.use((req,res)=>{
	res.end('注册新用户：' + req.body.username)
})
.listen(9999);
console.log(9999);