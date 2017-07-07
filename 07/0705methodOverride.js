let connect = require('connect');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

function edit (req,res,next) {
	if('GET' != req.method) return next();
	res.setHeader('Content-Type','text/html');
	res.write('<form method="post">');
	res.write('<input type="hidden" value="put" />');
	res.write('<input type="text" name="user[name]" value="Tobi" />');
	res.write('<input type="submit" value="Update" />');
	res.write('</form>');
	res.end();
}

function update (req,res,next) {
	if('PUT'!=req.method) return next();
	res.end('Updated name to' + req.body.user.name);
}

var app = connect()
.use(require('connect-logger')())
.use(bodyParser.json())
.use(methodOverride())
.use(edit)
.use(update);
app.listen(9999);
console.log(9999);