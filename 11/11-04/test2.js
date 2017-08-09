let pug = require('pug');
let fs = require('fs');

let template = fs.readFileSync('./template.pug');

let context = { messages: [
	'You have logged in successfully.',
	'Welcome back!'
]};
var fn = pug.compile(template);
console.log(fn(context));
