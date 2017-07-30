function parseField(field) {
	return field.split(/\[|\]/).filter((s)=>{return s;})
}

function getField(req,field) {
	var val = req.body;
	field.forEach((prop)=>{
		val = val[prop];
	});
	return val;
}

exports.required = function(field){
	field = parseField(field);
	return function(req,res,next){
		if(getField(req,field)){
			next();
		}else{
			res.error(field.join(' ') + '为必填项');
			res.redirect('back');
		}
	}
}

exports.lengthAbove = function(field,len){
	field = parseField(field);
	return function(req,res,next){
		if(getField(req,field).length > len){
			next();
		}else{
			res.error(field.join(' ') + '不能少于' + len + '个字');
			res.redirect('back');
		}
	}
}