var debug;
if(process.env.DEBUG){
	debug = function(data){
		console.error(data);
	};
}else{
	debug = function(){};
}

debug('this is a debug call');
console.log('HW');
debug('this is another debug call');

//退出事件
process.on('exit',function(code){
	console.log('Exiting...');
});

//报错捕捉
process.on('uncaughtException',function(err){
	console.log('got uncaught exception:',err.message);
	process.exit(1);
});

throw new Error('an uncaught exception');
