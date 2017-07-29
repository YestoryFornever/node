var express = require('express');
var router = express.Router();
var User = require('../lib/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	// res.send('注册');
	res.render('register',{title:'注册'});
});

router.post('/register', function(req, res, next) {
	var data = req.body;
	User.getByName(data.name, function(err, user){
		if(err) return next(err);
		if(user.id){
			res.error('用户名已被注册');
			res.redirect('back');
		}else{
			user = new User({
				name: data.name,
				pass: data.pass
			});

			user.save(function(err){
				if(err) return next(err);
				req.session.uid = user.id;
				res.redirect('./');
			});
		}
	})
});

router.get('/login',function(req,res){
	res.render('login',{title:'Login'});
});

router.post('/login',function(req,res,next){
	var data = req.body;
	User.authenticate(data.name,data.pass,function(err,user){
		if(err) return next(err);
		if(user){
			req.session.uid = user.id;
			res.redirect('./');
		}else{
			res.error("不让你进，你这个大屁眼子");
			res.redirect('back');
		}
	});
});

router.get('/logout',function(req,res){
	req.session.destroy((err)=>{
		if(err) throw err;
		res.redirect('./');
	});
});

module.exports = router;
