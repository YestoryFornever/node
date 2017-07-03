let fs = require('fs');
let path = require('path');

/** mkdir方法仅能创建一层目录，递归创建目录需要用到一下mkdirR方法
console.log('创建目录 /tmp/test/');
fs.mkdir('./tmp/',(err)=>{
	if(err){
		return console.error(err);
	}
	console.log('目录创建成功。');
});*/

fs.mkdirR = function(dirPath, mode, callback) {
  //调用 fs.mkdir
  fs.mkdir(dirPath, mode, function(error) {
    //报4058错误时创建父层目录
    if (error && error.errno === -4058) {
      //递归创建所有父级目录
	  console.log(dirPath);
      fs.mkdirR(path.dirname(dirPath), mode, callback);
      //以及其他目录
      fs.mkdirR(dirPath, mode, callback);
    }
    //手工调用callback
    callback && callback(error);
  });
};

fs.mkdirR('./tmp/foo/bar/baz',0777,(err)=>{
	if(err) console.error(err)
	else console.log('pow!');
});