'use strict'

const path = require('path');

const cp = require('child_process');

const chokidar = require('chokidar');

// const watcher = chokidar.watch(path.join(__dirname, '/src'));
const watcher = chokidar.watch('.', {ignored: /(^|[\/\\])\../});

let appIns = cp.fork(path.join(__dirname, '/bin/www'));

watcher.on('ready', () => {

	watcher.on('change', (path) => {
		console.log(`文件 ${path} 变更`);
		appIns = reload(appIns);
	});

	watcher.on('add', (path) => {
		console.log(`文件 ${path} 新增`);
		appIns = reload(appIns);
	});

	watcher.on('unlink', (path) => {
		console.log(`文件 ${path} 删除`);
		appIns = reload(appIns);
	});

});

process.on('SIGINT', () => {
	process.exit(0);
});

function reload(appIns) {
	appIns.kill('SIGINT');
	return cp.fork(require('path').join(__dirname, '/bin/www'));
}