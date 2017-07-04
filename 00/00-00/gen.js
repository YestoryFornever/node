let fs = require('fs'),
	path = require('path'),
	replace = require('stream-replace');

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
//递归复制一份目录
let ncp = require('ncp').ncp;
ncp.limit = 16;
ncp(`./${InPut}/`,`./${OutPut}/`, function (err) {
	if (err) {
			return console.error(err);
	}
	console.log('done!');
	renameDir(`./${OutPut}/`,'xxx',fileName)
});

function renameDir(dir,oldFlag,newFlag) {//替换文件名
	var files = fs.readdirSync(dir),
		f,
		currentFile,
		path,
		newPath,
		file,
		reg =  new RegExp(oldFlag,"g");

	for (f = 0; f < files.length; f++) {
		currentFile = files[f];
		path = dir + '/' + currentFile;
		file = fs.statSync(path);
		console.log(path,1);
		replaceStream(path,()=>{
			newPath = path.replace(reg,newFlag);
			fs.renameSync(path, newPath);
			if (file.isDirectory()) {
				renameDir(newPath,oldFlag,newFlag);
			}
		});
	}
}

function replaceStream(path,callback){
	console.log(path,2);
	fs.readFile(path, 'utf8', function (err,data) {
		if (err) {
			console.log(err);
			callback();
		}else{
			console.log(path,3);
			var result = data
				.replace(new RegExp(FileName,'g'), fileName)
				.replace(new RegExp(HumpName,'g'), humpName)
				.replace(new RegExp(CapName,'g'), capName);
			console.log(result);
			fs.writeFile(path, result, 'utf8', function (err) {
				if (err) return console.log(err);
				callback();
			});
		}
	});
}