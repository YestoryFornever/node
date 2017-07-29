let redis = require('redis');//NoSQL数据库
let bcrypt = require('bcrypt');//哈希
let db = redis.createClient();

module.exports = User;

function User(obj){
	for(let key in obj){
		this[key] = obj[key];
	}
}

User.prototype.save = function(fn){//保存用户
	if(this.id){//用户已存在，更新用户数据
		this.update(fn);
	}else{//用户不存在，新建用户
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

User.prototype.update = function(fn){//更新用户数据
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
		bcrypt.hash(user.pass, salt, (err,hash)=>{//用户密码哈希加密
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

User.getByName = function(name,fn){//通过用户名获取用户数据
	User.getId(name,function(err,id){//通过用户名获取用户id
		if(err) return fn(err);
		User.get(id,fn);
	});
};

User.getId = function(name,fn) {//通过用户id获取用户数据
	db.hgetall('user' + id,(err,user)=>{
		if(err) return fn(err);
		fn(null,new User(user));
	});
}

User.authenticate = function(name, pass, fn){//用户认证
	User.getByName(name,(err,user)=>{
		if(err) return fn(err);
		if(!user.id) return fn();
		bcrypt.hash(pass,user.salt,(err,hash)=>{//用户输入密码加盐
			if(err) return fn(err);
			if(hash == user.pass) return fn(null,user);//对比相等，返回
			fn();//否则，密码不正确，返回无效
		})
	})
}