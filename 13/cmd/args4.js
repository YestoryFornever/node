console.log('\033[32mhello\033[39m');
var ansi = require('ansi');
var cursor = ansi(process.stdout);

cursor.bg.red()
	.fg.green()
	.write('Hello')
	.bg.reset()
	.fg.reset()
	.write('\n');
