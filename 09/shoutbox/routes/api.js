let basicAuth = require('basic-auth-connect');
var User = require('../lib/user');
var express = require('express');
var router = express.Router();
var validate = require('../lib/middleware/validate');
var Entry = require('../lib/entry');
var page = require('../lib/middleware/page');

/* GET home page. */
router.get('/user/:id', function(req,res,next){
	User.get(req.params.id,(err,user)=>{
		if(err) return next(err);
		if(!user.id) return res.send(404);
		res.json(user.toJson());
	})
});

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

router.get('/entries/:page?',page(Entry.count, 5), function(req, res, next) {
	var page = req.page;
	Entry.getRange(page.from, page.to, (err,entries)=>{
		if(err) return next(err);
		res.format({
			json: function(){
				// res.json(entries);
				res.send(entries);
			},
			xml: function(){
				res.render('entries/xml', { entries: entries });
			}
		});
	});
});

exports.route = router;
// exports.auth = basicAuth('admin','pwdpwd');
exports.auth = basicAuth(User.authenticate);//库中所有用户均可获取其他任何人的数据