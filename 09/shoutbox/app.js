var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require('./lib/middleware/user');

var users = require('./routes/users');
var routes = require('./routes/index');
var entries = require('./routes/entries');

var messages = require('./lib/messages');

var api = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'xxxx',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }}));//这里非常重要，如果设为true，session存储不会成功
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',api.auth);
app.use(user);
app.use(messages);

app.use('/', users);
app.use('/index', routes);
app.use('/entries',entries);
app.use('/api',api.route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.status(404).format({
		html:function(){
			res.render('404');
		},
		json:function(){
			res.send({
				message:'资源找不到'
			});
		},
		xml:function(){
			res.write('<error>\n');
			res.write('<message>资源找不到</message>\n');
			res.write('</error>\n');
		},
		text:function(){
			res.send('资源找不到\n');
		}
	});
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
