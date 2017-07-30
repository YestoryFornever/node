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

exports.route = router;
// exports.auth = basicAuth('admin','pwdpwd');
exports.auth = basicAuth(User.authenticate);//库中所有用户均可获取其他任何人的数据