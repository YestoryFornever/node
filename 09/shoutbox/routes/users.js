var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	// res.send('注册');
	res.render('register',{title:'注册'});
});

module.exports = router;
