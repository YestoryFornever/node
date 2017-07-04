let fs = require('fs');

var _argv = process.argv.slice(2);
let fileName = _argv[0];
let InPutARGV = _argv[1];

//替换字符串格式
//羊肉串
let FileName = '<%= name %>';
//驼峰
let HumpName = '<%= hump %>';
//首字母大写
let CapName  = '<%= upCaseName %>';
//模板目录
let InPut    = InPutARGV||'generator';
//输出目录
let OutPut   = 'target';

humpName = fileName.replace(/-\w/,(item)=>{
	return item[1].toUpperCase();
});
capName = (humpName[0].toUpperCase()).concat(humpName.slice(1,humpName.length));
console.log(fileName,humpName,capName);

let deleteFolderRecursive = (path)=>{
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
//递归删除输出文件夹
deleteFolderRecursive(`./${OutPut}/`);

let copyFile = (input,output)=>{
	fs.createReadStream(input).pipe(fs.createWriteStream(output));
}
console.log(`./${InPut}/`,`./${OutPut}/`);
copyFile(`./${InPut}/`,`./${OutPut}/`);

/*console.log('查看/generator-module/目录');
fs.readdir('./generator-module/',(err,files)=>{
	if(err){
		return console.error(err);
	}
	files.forEach((file)=>{
		console.log(file);
	});
});*/