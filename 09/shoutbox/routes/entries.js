var express = require('express');
var router = express.Router();

var Entry = require('../lib/entry');

var validate = require('../lib/middleware/validate');
var page = require('../lib/middleware/page');

router.get('/', page(Entry.count, 5), function(req, res, next) {
	var page = req.page;
	Entry.getRange(page.from, page.to, (err,entries)=>{
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

router.post('/post',
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
		res.redirect('./');
	})
});

module.exports = router;