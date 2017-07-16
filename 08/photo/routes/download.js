var Photo = require('../models/Photo');
var path = require('path');
var join = path.join;

module.exports = (dir)=>{
	return function(req,res,next){
		var id = req.params.id;
		console.log(id);
		Photo.findById(id,(err,photo)=>{
			if(err) return next(err);
			console.log(photo.path);
			var path = join(dir,photo.path);
			res.download(path);
		})
	}
};