let pug = require('pug');
let fs = require('fs');

let templateFile = './page.pug';
let iterTemplate = fs.readFileSync(templateFile);
let context = {messages:[
	'asdgwesdg',
	'sdgweqwe'
]};
let iterFn = pug.compile(
	iterTemplate,
	{filename: templateFile}
);
console.log(iterFn(context));
