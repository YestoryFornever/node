let ejs = require('ejs');
let template = '<%- locals.message %>';
let context = {message: '<script>alert("XSS attack")</script>'};

console.log(ejs.render(template,{locals:context}));
