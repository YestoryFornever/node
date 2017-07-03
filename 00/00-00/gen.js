let fs = require('fs');

console.log('查看/generator-module/目录');
fs.readdir('./generator-module/',(err,files)=>{
	if(err){
		return console.error(err);
	}
	files.forEach((file)=>{
		console.log(file);
	});
});