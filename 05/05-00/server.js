let http = require('http');
let counter = 0;
var server = http.createServer((req,res)=>{
	counter++;
	res.write('i have been accessed '+ counter + ' times.');
	res.end();
});
server.listen(9999);
console.log(`9999:${counter}`);