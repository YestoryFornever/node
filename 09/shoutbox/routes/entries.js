var express = require('express');
var router = express.Router();

var Entry = require('../lib/entry');

router.get('/post', function(req, res, next) {
	Entry.getRange(0,-1,(err,entries)=>{
		if(err) return next(err);
		res.render('entries',{
			title:'Entries',
			entries:entries,
		});
	});
});

module.exports = router;