let redis = require('redis');
let bcrypt = require('bcrypt');
let db = redis.createClient();

module.exports = User;

function User(obj){
	for(let key in obj){
		this[key] = obj[key];
	}
}

User.prototype.save = (fn)=>{
	if(this.id){
		this.update(fn);
	}else{
		var user = this;
		db.incr('user:ids',(err,id)=>{
			if(err) return fn(err);
			user.id = id;
			user.hashPassword((err)=>{
				if(err) return fn(err);
				user.update(fn);
			});
		});
	}
}

User.prototype.update = (fn)=>{
	var user = this;
	var id = user.id;
	db.set('user:id:'+user.name,id,(err)=>{
		if(err) return fn(err);
		db.hmset('user:'+id,user,(err)=>{
			fn(err);
		});
	});
}

User.prototype.hashPassword = (fn)=>{
	var user = this;
	bcrypt.genSalt(12,(err,salt)=>{//加盐，干扰彩虹表攻击
		if(err) return fn(err);
		user.salt = salt;
		bcrypt.hash(user.pass, salt, (err,hash)=>{
			if(err) return fn(err);
			user.pass = hash;
			fn();
		});
	});
};

var tobi = new User({
	name:'Tobi',
	pass:'im a ferret',
	age:'2'
});
tobi.save((err)=>{
	if(err) throw err;
	console.log('user id %d', tobi.id);
})