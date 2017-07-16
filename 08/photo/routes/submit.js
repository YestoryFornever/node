var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

module.exports = (dir)=>{
	return function(req,res,next){
		/*for(let x in req)
			console.log(x);
		console.log('-----');*/
		var img = req.files.photo.image;
		var name = req.body.photo.name||img.name;
		var path = join(dir,img.name);
		fs.rename(img.path, path, (err)=>{
			if(err) return next(err);
			Photo.create({
				name:name,
				path:img.name
			},(err)=>{
				if(err) return next(err);
				res.redirect('/photos');
			});
		})
	}
};