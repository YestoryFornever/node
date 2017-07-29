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
				res.redirect('/');
			});
		}
	})
});

module.exports = router;
