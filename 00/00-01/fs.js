let fs = require('fs');

// 复制
var readStream = fs.createReadStream('input.txt');
var writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
