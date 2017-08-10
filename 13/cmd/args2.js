var args = process.argv.slice(2);

args.forEach(function(arg){
	switch(arg){
		case '-h':
		case '--help':
			printHelp();
			break;
	}
});

function printHelp(){
	console.log('	usage:');
	console.log(' $ AwesomeProgram <option> <file-to-awesomeify>');
	process.exit(0);
}
