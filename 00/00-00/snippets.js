//替换文件内容
var fs = require('fs');
function replaceFileContent (filepath) {
	fs.readFile(filepath, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		var result = data.replace(/string to be replaced/g, 'replacement');

		fs.writeFile(filepath, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
}

/**使用streams*/
var es = require('event-stream');
function replaceWithStreams(path) {
    var REGEX = /<replace src="(.+)" \/>/g;
    fs.createReadStream(path, 'utf8')
        .pipe(es.split()) // split the input file into lines
        .pipe(es.map(function (line, next) {
            line = line.replace(REGEX, function(match, replacePath) {
                // better to keep a readFileSync here for clarity
                return fs.readFileSync(replacePath, 'utf8'); 
            });
            next(null, line);
        })).pipe(fs.createWriteStream(path)); // change path if needed
}
replaceWithStreams('./main.html');

//复制文件
function copyFile(input,output){
	fs.createReadStream().pipe(fs.createWriteStream('newLog.log'));
}
copyFile('test.log');