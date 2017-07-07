let connect = require('connect');
var vhost = require('vhost');

var server = connect();
var app = require('./sites/expressjs.dev');

app.use(vhost('expressjs.dev',app));
server.listen(9999);
console.log(9999);