let fs = require('fs');

//打开文件
console.log('准备打开文件');
fs.open('../input.txt','r+',(err,fd)=>{
	if(err) {
		return console.error(err);
	}
	console.log('文件打开成功');
	//关闭文件
	console.log('准备关闭文件');
	fs.close(fd,(err)=>{
		if(err){
			console.log(err);
		}
		console.log('文件关闭成功');
	});
});