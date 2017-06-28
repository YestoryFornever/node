var fs = require('fs'),
	watchDir = './watch',
	processedDir = './done';

/**
 * [Watcher继承事件发射器]
 * @param {[type]} watchDir     [监听目录]
 * @param {[type]} processedDir [目标目录]
 */
function Watcher(watchDir,processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}
var events = require('events'),
	util = require('util');

util.inherits(Watcher,events.EventEmitter);
// 上句等同于该句 Watcher.prototype = new events.EventEmitter();

Watcher.prototype.watch = function(){
	var watcher = this;
	fs.readdir(this.watchDir,function(err,files){
		if(err) throw err;
		for(var index in files){
			watcher.emit('process',files[index]);
		}
	})；
}

Watcher.prototype.start = function(){
	var watcher = this;
	fs.watchFile(watchDir,function(){
		watcher.watch();
	});
}

/**
 * [watcher 实例化]
 */
var watcher = new Watcher(watchDir, processedDir);

watcher.on('process',function process(file){// 针对每个文件所做的操作
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();
	fs.rename(watchFile,processedFile,function(err){
		if(err)
			throw err;
	});
});

watcher.start();