let fs = require('fs');

//获取文件信息
fs.stat('input.txt',(err,stats)=>{
	if(err) return console.error(err);
	console.log(stats);
	console.log(stats.isFile());			//	如果是文件返回 true，否则返回 false。
	console.log(stats.isDirectory());			//	如果是目录返回 true，否则返回 false。
	console.log(stats.isBlockDevice());			//	如果是块设备返回 true，否则返回 false。
	console.log(stats.isCharacterDevice());			//	如果是字符设备返回 true，否则返回 false。
	console.log(stats.isSymbolicLink());			//	如果是软链接返回 true，否则返回 false。
	console.log(stats.isFIFO());			//	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
	console.log(stats.isSocket());			//	如果是 Socket 返回 true，否则返回 false。
});