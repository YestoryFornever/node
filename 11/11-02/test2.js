var ejs = require('ejs');
var template = '<%=: movies|upcase %>';
//var template = '<%= movies %>';
var context = {'movies':[
	'bob',
	'B',
	'C',
]};

console.log(ejs.render(template, context));
