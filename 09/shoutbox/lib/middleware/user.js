var User = require('../user');

module.exports = function(req,res,next){
	var uid = req.session.uid;
	// console.log(req.session.cookie);
	console.log("middleware uid:"+req.session.uid);
	if(!uid) return next();
	User.get(uid, function(err,user){
		if(err) return next(err);
		console.log(user);
		req.user = res.locals.user = user;
		next();
	});
}