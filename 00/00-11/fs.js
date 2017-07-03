let fs = require('fs');
console.log('准备删除/tmp/目录');
fs.rmdir('./tmp/',(err,files)=>{
	if(err){
		return console.error(err);
	}
	console.log('读取/tmp/目录');
	fs.readdir('./tmp/',(err,files)=>{
		if(err){
			return console.error(err);
		}
		files.forEach((file)=>{
			console.log(file);
		});
	});
});