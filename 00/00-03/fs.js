let fs = require('fs');

// 读取文件
fs.readFile('../input.txt',(err,data)=>{
	if(err){
		return console.error(err);
	}
	console.log('异步读取:'+data.toString());
});

let data = fs.readFileSync('../input.txt');
console.log('同步读取:'+data.toString());
console.log('程序执行完毕...');