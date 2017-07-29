let redis = require('redis');//NoSQL数据库
let bcrypt = require('bcrypt');//哈希
let db = redis.createClient();

module.exports = User;

function User(obj){
	for(let key in obj){
		this[key] = obj[key];
	}
}

User.prototype.save = function(fn){
	if(this.id){//用户已存在
		this.update(fn);
	}else{
		var user = this;
		db.incr('user:ids',(err,id)=>{//创建唯一id
			if(err) return fn(err);
			user.id = id;//设定id，以便保存
			user.hashPassword((err)=>{
				if(err) return fn(err);
				user.update(fn);//保存用户属性
			});
		});
	}
}

User.prototype.update = function(fn){
	var user = this;
	var id = user.id;
	db.set('user:id:'+user.name,id,(err)=>{//用名称索引用户id
		if(err) return fn(err);
		db.hmset('user:'+id,user,(err)=>{//用Redis哈希存储数据
			fn(err);
		});
	});
}
User.prototype.hashPassword = function(fn){
	var user = this;
	bcrypt.genSalt(12,(err,salt)=>{//加盐，干扰彩虹表攻击
		if(err) return fn(err);
		user.salt = salt;//设定盐以便保存
		bcrypt.hash(user.pass, salt, (err,hash)=>{
			if(err) return fn(err);
			user.pass = hash;//设定哈希以便保存
			fn();
		});
	});
};

/*var tobi = new User({
	name:'guoshijian',
	pass:'sunwukong',
	age:'22'
});
tobi.save((err)=>{
	if(err) throw err;
	console.log('user id %d', tobi.id);
});*/