let basicAuth = require('basic-auth-connect');
var User = require('../lib/user');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user/:id', function(req,res,next){
	User.get(req.params.id,(err,user)=>{
		if(err) return next(err);
		if(!user.id) return res.send(404);
		res.json(user.toJson());
	})
});

var validate = require('../lib/middleware/validate');
var Entry = require('../lib/entry');

router.post('/entry',
	validate.required('title'),
	validate.lengthAbove('title',4),
	function(req, res, next) {
		var data = req.body;

		var entry = new Entry({
			'username':res.locals.user.name,
			'title':data.title,
			'body':data.body
		});

		entry.save((err)=>{
			if(err) return next(err);
			if(req.remoteUser){
				res.json({message:'新消息已添加'})
			}else{
				res.redirect('./');
			}
		})
	}
);

exports.route = router;
// exports.auth = basicAuth('admin','pwdpwd');
exports.auth = basicAuth(User.authenticate);//库中所有用户均可获取其他任何人的数据