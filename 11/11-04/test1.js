let pug = require('pug');
let template = 'strong #{message}';
let context = {message:'Hello template'};

let fn = pug.compile(template);
console.log(fn(context));

