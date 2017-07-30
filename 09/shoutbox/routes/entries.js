var express = require('express');
var router = express.Router();

var Entry = require('../lib/entry');

router.get('/', function(req, res, next) {
	Entry.getRange(0,-1,(err,entries)=>{
		if(err) return next(err);
		res.render('entries',{
			title:'Entries',
			entries:entries,
		});
	});
});

router.get('/post', function(req, res, next) {
	res.render('post',{title:'Post'});
});

router.post('/post',function(req, res, next) {
	var data = req.body;

	var entry = new Entry({
		'username':res.locals.user.name,
		'title':data.title,
		'body':data.body
	});

	entry.save((err)=>{
		if(err) return next(err);
		res.redirect('./');
	})
});

module.exports = router;