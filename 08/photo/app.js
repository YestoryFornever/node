var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var submits = require('./routes/submit');
var downloads = require('./routes/download');

var app = express();

// 视图引擎配置
app.set('views', path.join(__dirname, 'views'));//视图目录
app.set('view engine', 'ejs');//视图模板
app.set('photos',__dirname+'/public/photos');//图片上传目录

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 解析json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie
app.use(cookieParser());
// 创建静态服务器
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/photos',photos);
console.log(app.get('photos'));
app.post('/photos/upload', multipartMiddleware, submits(app.get('photos')));
app.get('/photos/:id/download', downloads(app.get('photos')));

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('not found');
	err.status = 404;
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
