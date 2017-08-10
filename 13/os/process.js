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

process.on('exit',function(code){
	console.log('Exiting...');
});
