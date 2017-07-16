var Photo = require('../models/Photo');
var express = require('express');
var router = express.Router();

/*var photos = [];
photos.push({
	name:'Node.js Logo',
	path:'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
	name:'Ryan SB',
	path:'http://nodejs.org/images/ryan-speaker.jpg'
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
	Photo.find({},(err,photos)=>{
		if(err) return next(err);
		res.render('photos',{
			title:'Photos',
			photos:photos
		});
	});
});

router.get('/upload', function(req, res, next) {
	res.render('photos/upload',{
		title:'Photos Upload',
	});
});

module.exports = router;