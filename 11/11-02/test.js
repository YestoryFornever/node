let ejs = require('ejs');
let template = '<%= locals.message %>';
let context = {message: 'Hello template'};

console.log(ejs.render(template,{locals:context}));
